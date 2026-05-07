import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { LeadInput } from '@/lib/schemas/lead';
import { clientIp, getLimiter } from '@/lib/ratelimit';
import { verifyTurnstile } from '@/lib/turnstile';
import { serverClient } from '@/lib/sanity';
import { sendLeadNotification } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const limiter = getLimiter('lead', 5, '1 h');

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (limiter) {
    const { success, reset } = await limiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { ok: false, code: 'rate_limited' },
        { status: 429, headers: { 'retry-after': String(Math.ceil((reset - Date.now()) / 1000)) } }
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: 'invalid_json' }, { status: 400 });
  }
  const parsed = LeadInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, code: 'validation', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const lead = parsed.data;

  // Honeypot — ack silently to bots.
  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const human = await verifyTurnstile(lead.turnstileToken, ip);
  if (!human) {
    return NextResponse.json({ ok: false, code: 'captcha' }, { status: 400 });
  }

  const sanity = serverClient();
  const persist = sanity
    ? sanity
        .create({
          _type: 'lead',
          name: lead.name,
          email: lead.email,
          company: lead.company ?? '',
          message: lead.message,
          locale: lead.locale,
          source: 'web-landing',
          ip: hashIp(ip),
          createdAt: new Date().toISOString(),
        })
        .then(() => true)
        .catch((err: unknown) => {
          console.error('[lead] sanity write failed', err);
          return false;
        })
    : Promise.resolve(false);

  const notify = sendLeadNotification({
    name: lead.name,
    email: lead.email,
    company: lead.company,
    message: lead.message,
    locale: lead.locale,
  }).catch((err: unknown) => {
    console.error('[lead] resend failed', err);
  });

  await Promise.all([persist, notify]);

  return NextResponse.json({ ok: true });
}
