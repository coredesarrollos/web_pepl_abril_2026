'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SERVICES } from '@/lib/services';
import { useTheme } from '@/components/theme/ThemeProvider';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { Locale } from '@/i18n/routing';

export function Audiences() {
  const t = useTranslations('audiences');
  const locale = useLocale() as Locale;
  const [activeIdx, setActiveIdx] = useState(0);
  const { setTheme } = useTheme();
  const active = SERVICES[activeIdx]!;
  const copy = active.i18n[locale];

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    setTheme(SERVICES[idx]!.suggestedTheme);
  };

  return (
    <Section id="audiences">
      <Reveal preset="fadeUp">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-mute)]">
          {t('eyebrow')}
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-12">
        <div role="tablist" aria-label="Audiences" className="flex flex-col gap-2 md:col-span-4">
          {SERVICES.map((s, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`audience-panel-${s.id}`}
                id={`audience-tab-${s.id}`}
                onClick={() => handleSelect(idx)}
                className={cn(
                  'focus-ring rounded-[var(--radius-md)] border px-5 py-4 text-left transition-colors',
                  isActive
                    ? 'border-transparent bg-brand-gradient text-white shadow-[var(--shadow-card)]'
                    : 'border-[var(--color-line)] bg-[var(--color-paper-soft)] text-[var(--color-ink)] hover:border-[var(--accent)]'
                )}
              >
                <span className="block text-sm uppercase tracking-wider opacity-80">
                  0{idx + 1}
                </span>
                <span className="text-lg font-semibold">{s.i18n[locale].title}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`audience-panel-${active.id}`}
          aria-labelledby={`audience-tab-${active.id}`}
          className="md:col-span-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE.out }}
              className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-soft)] p-8 shadow-[var(--shadow-card)]"
            >
              <h3 className="text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
                {copy.subtitle}
              </h3>
              <p className="mt-4 text-[var(--color-ink-soft)] md:text-lg">
                {copy.description}
              </p>
              <ul className="mt-6 space-y-3">
                {copy.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-2 w-2 flex-none rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                    <span className="text-[var(--color-ink-soft)]">{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="focus-ring mt-8 inline-flex rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-white hover:brightness-110"
              >
                {copy.cta}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
