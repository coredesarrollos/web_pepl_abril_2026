'use client';

import { useTheme } from './ThemeProvider';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { magnetic } from '@/lib/motion';
import type { Locale } from '@/i18n/routing';

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { themes, themeId, setTheme } = useTheme();
  const t = useTranslations('themeSwitcher');
  const locale = useLocale() as Locale;

  return (
    <div
      role="radiogroup"
      aria-label={t('label')}
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[var(--color-paper-soft)] p-1"
    >
      {themes.map((th) => {
        const active = th.id === themeId;
        return (
          <motion.button
            key={th.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={th.name[locale]}
            title={th.concept[locale]}
            onClick={() => setTheme(th.id)}
            className="focus-ring relative h-7 w-7 rounded-full"
            style={{
              background: `linear-gradient(120deg, ${th.from}, ${th.to})`,
              boxShadow: active ? `0 0 0 2px ${th.accent}` : 'none',
            }}
            {...magnetic}
          >
            {!compact && active && (
              <span className="sr-only">{th.name[locale]}</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
