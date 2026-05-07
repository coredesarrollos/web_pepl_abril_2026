'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Logo } from '@/components/brand/Logo';
import { useTheme } from '@/components/theme/ThemeProvider';
import type { Locale } from '@/i18n/routing';

/**
 * Internal-only page: lets the team try every theme live and mark one as official.
 * Gated by middleware (cookie `pepl_pitch` must equal env PITCH_ACCESS_TOKEN).
 */
export default function ThemeLabPage() {
  const t = useTranslations('themeLab');
  const locale = useLocale() as Locale;
  const { themes, themeId, setTheme } = useTheme();

  return (
    <Section>
      <Reveal preset="fadeUp">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">{t('subtitle')}</p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {themes.map((th) => {
          const active = th.id === themeId;
          return (
            <article
              key={th.id}
              className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-soft)] shadow-[var(--shadow-card)]"
            >
              <div
                className="flex h-44 items-center justify-center"
                style={{ background: `linear-gradient(120deg, ${th.from}, ${th.to})` }}
              >
                <Logo className="h-12 w-auto text-white" />
              </div>
              <div className="p-6">
                <header className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-ink)]">
                      {th.name[locale]}
                    </h2>
                    <p className="text-sm text-[var(--color-mute)]">{th.concept[locale]}</p>
                  </div>
                  {active && (
                    <span className="rounded-full bg-[var(--color-ink)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                      {t('officialBadge')}
                    </span>
                  )}
                </header>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme(th.id)}
                    className="focus-ring rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-2 text-sm"
                  >
                    {t('preview')}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setTheme(th.id);
                      // TODO: POST to /api/theme/official to persist in Sanity.
                    }}
                    className="focus-ring rounded-full bg-brand-gradient px-4 py-2 text-sm text-white"
                    style={{ background: `linear-gradient(120deg, ${th.from}, ${th.to})` }}
                  >
                    {t('markOfficial')}
                  </button>
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded bg-[var(--color-paper)] p-3">
                    <dt className="text-[var(--color-mute)]">from</dt>
                    <dd className="font-mono text-[var(--color-ink)]">{th.from}</dd>
                  </div>
                  <div className="rounded bg-[var(--color-paper)] p-3">
                    <dt className="text-[var(--color-mute)]">to</dt>
                    <dd className="font-mono text-[var(--color-ink)]">{th.to}</dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
