'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function LeadForm() {
  const t = useTranslations('cta.form');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [errorKey, setErrorKey] = useState<string>('errorGeneric');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('submitting');
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { code?: string };
      if (res.status === 429) setErrorKey('errorRate');
      else if (res.status === 400) setErrorKey('errorValidation');
      else setErrorKey(body.code === 'rate_limited' ? 'errorRate' : 'errorGeneric');
      setStatus('error');
    } catch {
      setErrorKey('errorGeneric');
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-soft)] p-8 shadow-[var(--shadow-card)]"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label={t('name')} required />
        <Field id="email" label={t('email')} type="email" required />
        <Field id="company" label={t('company')} className="md:col-span-2" />
        <Field
          id="message"
          label={t('message')}
          textarea
          required
          className="md:col-span-2"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('submitting') : t('submit')}
        </Button>
        <p
          aria-live="polite"
          className={cn(
            'text-sm',
            status === 'success' && 'text-emerald-600',
            status === 'error' && 'text-red-600'
          )}
        >
          {status === 'success' && t('success')}
          {status === 'error' && t(errorKey as 'errorGeneric' | 'errorRate' | 'errorValidation')}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  type = 'text',
  required,
  textarea,
  className,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}) {
  const baseClass =
    'focus-ring w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-mute)]';
  return (
    <label className={cn('block text-sm font-medium text-[var(--color-ink)]', className)}>
      <span className="mb-2 inline-block">
        {label} {required && <span className="text-[var(--accent)]">*</span>}
      </span>
      {textarea ? (
        <textarea id={id} name={id} required={required} rows={5} className={baseClass} />
      ) : (
        <input id={id} name={id} type={type} required={required} className={baseClass} autoComplete="on" />
      )}
    </label>
  );
}
