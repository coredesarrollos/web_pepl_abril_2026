import { z } from 'zod';

export const LeadInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  company: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().min(10).max(2000),
  /** Honeypot — must be empty. */
  website: z.string().max(0).optional().default(''),
  /** Cloudflare Turnstile token. Required in production. */
  turnstileToken: z.string().min(1).optional(),
  /** Locale for reply email. */
  locale: z.enum(['es', 'en']).default('es'),
});

export type LeadInputT = z.infer<typeof LeadInput>;
