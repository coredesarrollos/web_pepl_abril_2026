import { describe, expect, it } from 'vitest';
import { LeadInput } from '@/lib/schemas/lead';

describe('LeadInput schema', () => {
  it('accepts a valid payload', () => {
    const r = LeadInput.safeParse({
      name: 'Ana Lopez',
      email: 'ana@example.com',
      message: 'Quiero ver una demo',
    });
    expect(r.success).toBe(true);
  });
  it('rejects too-short messages', () => {
    const r = LeadInput.safeParse({ name: 'Ana', email: 'a@b.co', message: 'no' });
    expect(r.success).toBe(false);
  });
  it('rejects invalid emails', () => {
    const r = LeadInput.safeParse({ name: 'Ana', email: 'no-at', message: 'hola hola hola' });
    expect(r.success).toBe(false);
  });
  it('rejects honeypot non-empty', () => {
    const r = LeadInput.safeParse({
      name: 'Ana',
      email: 'a@b.co',
      message: 'hola hola hola hola',
      website: 'https://spam.example',
    });
    expect(r.success).toBe(false);
  });
});
