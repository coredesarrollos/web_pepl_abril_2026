import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY ?? '';
const from = process.env.RESEND_FROM ?? 'PEpL <hello@pepl.app>';

export const resendEnabled = apiKey.length > 0;

const client = resendEnabled ? new Resend(apiKey) : null;

type LeadPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  locale: 'es' | 'en';
};

function escape(s: string) {
  return s.replace(/[<>&"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function sendLeadNotification(lead: LeadPayload): Promise<void> {
  if (!client) return;
  const to = process.env.LEAD_NOTIFY_TO;
  if (!to) return;

  const subject = `Nuevo lead PEpL — ${lead.name}`;
  const html = `
    <h2>Nuevo lead</h2>
    <p><strong>Nombre:</strong> ${escape(lead.name)}</p>
    <p><strong>Email:</strong> ${escape(lead.email)}</p>
    ${lead.company ? `<p><strong>Compañía:</strong> ${escape(lead.company)}</p>` : ''}
    <p><strong>Locale:</strong> ${lead.locale}</p>
    <p><strong>Mensaje:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escape(lead.message)}</pre>
  `;

  await client.emails.send({
    from,
    to: to.split(',').map((s) => s.trim()),
    replyTo: lead.email,
    subject,
    html,
  });
}
