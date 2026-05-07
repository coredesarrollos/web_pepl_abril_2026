import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = ['track', 'validate', 'reward'] as const;

export function HowItWorks() {
  const t = useTranslations('how');
  return (
    <Section id="how">
      <Reveal preset="fadeUp">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-mute)]">
          {t('eyebrow')}
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-5xl">
          {t('title')}
        </h2>
      </Reveal>
      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((id, idx) => (
          <Reveal preset="fadeUp" delay={0.1 * idx} key={id}>
            <li className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-soft)] p-8 shadow-[var(--shadow-card)]">
              <div
                className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{
                  background: `linear-gradient(120deg, var(--brand-from), var(--brand-to))`,
                }}
                aria-hidden
              >
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                {t(`steps.${id}.title`)}
              </h3>
              <p className="mt-3 text-[var(--color-ink-soft)]">
                {t(`steps.${id}.body`)}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
