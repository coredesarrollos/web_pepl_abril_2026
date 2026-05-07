'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const MEMBERS = [
  {
    name: 'Alejo Martín Cardoso',
    role: 'Founder & CEO',
    photo: '/team/alejo-cardoso.jpg',
    linkedin: 'https://www.linkedin.com/in/alejomcb/',
  },
  {
    name: 'Manuel Bustelo',
    role: 'Co-Founder, Management',
    photo: '/team/manuel-bustelo.jpg',
    linkedin: 'https://www.linkedin.com/in/manuel-bustelo-6027393/',
  },
  {
    name: 'Daniel Suilar',
    role: 'Co-Founder, Technology Strategy',
    photo: '/team/daniel-suilar.jpg',
    linkedin: 'https://www.linkedin.com/in/dsuilar/',
  },
  {
    name: 'Julio Ballestero',
    role: 'Co-Founder, Technical Lead',
    photo: '/team/julio-ballestero.jpg',
    linkedin: 'https://www.linkedin.com/in/julioaballestero/',
  },
] as const;

export function Team() {
  const t = useTranslations('about');

  return (
    <Section id="team" tone="default">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <Reveal as="h1" preset="fadeUp" className="text-4xl font-extrabold text-[var(--color-brand)] mb-1">
          {t('heading')}
        </Reveal>
        <Reveal preset="fadeUp" delay={0.05}>
          <p className="text-lg font-semibold text-[var(--color-brand)] mb-6">{t('subheading')}</p>
        </Reveal>
        <Reveal preset="fadeUp" delay={0.1}>
          <p className="text-base text-[var(--color-ink-soft)] max-w-3xl mb-16">{t('description')}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {MEMBERS.map((member, i) => (
            <Reveal key={member.name} preset="fadeUp" delay={0.1 + i * 0.07}>
              <div className="flex flex-col gap-3">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <p className="text-lg font-bold text-[var(--color-brand)]">{member.name}</p>
                <p className="text-sm text-[var(--color-ink-soft)]">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-brand)] underline underline-offset-2 hover:opacity-70 transition-opacity w-fit"
                >
                  {t('linkedinLabel')}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
