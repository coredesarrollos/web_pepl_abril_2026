/**
 * Webhook que dispara Sanity al actualizar `siteTheme`.
 * Verifica un secreto compartido (`SANITY_REVALIDATE_SECRET`) y revalida el tag
 * `site-theme` para que el próximo render lea el tema oficial nuevo.
 *
 * Configurar en Sanity → API → Webhooks:
 *   URL: https://<host>/api/revalidate
 *   Trigger: on create/update/delete
 *   Filter: _type == "siteTheme"
 *   Secret: el mismo valor que `SANITY_REVALIDATE_SECRET`
 */
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, code: 'not_configured' }, { status: 503 });
  }
  const provided =
    req.headers.get('sanity-webhook-signature') ?? req.headers.get('x-sanity-signature') ?? '';
  // Sanity puede mandar HMAC o secret simple en el body — aceptamos token en query como fallback dev.
  const url = new URL(req.url);
  const token = url.searchParams.get('secret') ?? provided;
  if (token !== secret) {
    return NextResponse.json({ ok: false, code: 'unauthorized' }, { status: 401 });
  }
  revalidateTag('site-theme');
  return NextResponse.json({ ok: true, revalidated: ['site-theme'] });
}
