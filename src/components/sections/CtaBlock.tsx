import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { LeadForm } from '@/components/forms/LeadForm';
import { useTranslations } from 'next-intl';

export function CtaBlock() {
  const t = useTranslations('cta');
  return (
    <Section id="contact">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal preset="fadeUp" className="md:col-span-5">
          <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-soft)]">{t('subtitle')}</p>
        </Reveal>
        <Reveal preset="fadeUp" delay={0.15} className="md:col-span-7">
          <LeadForm />
        </Reveal>
      </div>
    </Section>
  );
}
