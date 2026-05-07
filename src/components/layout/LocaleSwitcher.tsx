'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale() as Locale;
  const next: Locale = current === 'es' ? 'en' : 'es';

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      className="focus-ring rounded-full border border-[var(--color-line)] bg-[var(--color-paper-soft)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-ink-soft)]"
      aria-label={`Switch language to ${next === 'es' ? 'Español' : 'English'}`}
    >
      {next === 'es' ? 'ES' : 'EN'}
      <span className="sr-only"> ({routing.locales.length} locales)</span>
    </button>
  );
}
