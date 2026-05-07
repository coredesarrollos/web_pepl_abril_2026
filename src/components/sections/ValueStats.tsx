import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const KEYS = ['members', 'partners', 'redemption', 'retention'] as const;

export function ValueStats() {
  const t = useTranslations('value');
  return (
    <Section tone="accent">
      <Reveal preset="fadeUp">
        <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {t('title')}
        </h2>
      </Reveal>
      <dl className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {KEYS.map((k, i) => (
          <Reveal key={k} preset="scaleIn" delay={0.08 * i}>
            <div>
              <dt className="text-sm uppercase tracking-wider opacity-80">
                {t(`stats.${k}.label`)}
              </dt>
              <dd className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">
                {t(`stats.${k}.value`)}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
