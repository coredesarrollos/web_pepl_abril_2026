import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export function Manifesto() {
  const t = useTranslations('manifesto');
  return (
    <Section id="manifesto" tone="dark">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal preset="fadeUp" className="md:col-span-7">
          <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {t('title')}{' '}
            <span className="text-brand-gradient">{t('title2')}</span>
          </h2>
        </Reveal>
        <Reveal preset="fadeUp" delay={0.15} className="md:col-span-5">
          <p className="text-pretty text-lg text-[color-mix(in_oklab,var(--color-paper)_80%,transparent)] md:text-xl">
            {t('body')}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
