import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const CARDS = ['card1', 'card2', 'card3'] as const;

export function Problem() {
  const t = useTranslations('problema');
  return (
    <Section id="problema">
      <Reveal preset="fadeUp">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-mute)]">
          {t('eyebrow')}
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-5xl">
          {t('title')}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {CARDS.map((key, i) => (
          <Reveal key={key} preset="fadeUp" delay={i * 0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-8 shadow-[var(--shadow-card)]">
              <span className="mb-4 text-4xl" aria-hidden>
                {t(`${key}Icon`)}
              </span>
              <h3 className="text-xl font-bold text-[var(--color-ink)]">
                {t(`${key}Title`)}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-mute)]">
                {t(`${key}Body`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
