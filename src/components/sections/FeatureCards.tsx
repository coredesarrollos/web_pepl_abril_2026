import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';

function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M12 2C9 6 6 8 6 12c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.5-2.9-1.3-4-.7 1-1.7 1.7-2.7 2 1-2 1-4-2-8z" />
    </svg>
  );
}

const CARDS = [
  { key: 'card1', Icon: TargetIcon },
  { key: 'card2', Icon: TrendingUpIcon },
  { key: 'card3', Icon: FlameIcon },
] as const;

export function FeatureCards() {
  const t = useTranslations('features');
  return (
    <section className="bg-[var(--color-paper)] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature cards */}
          {CARDS.map(({ key, Icon }, i) => (
            <Reveal key={key} preset="fadeUp" delay={i * 0.08}>
              <article className="group relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-xl">
                {/* Icon circle */}
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: 'linear-gradient(135deg, var(--brand-from), var(--brand-to))' }}
                >
                  <Icon />
                </div>

                {/* Title */}
                <p className="text-[1.05rem] leading-snug text-[var(--color-ink)]">
                  <strong className="font-extrabold">{t(`${key}Title`)}</strong>{' '}
                  <span className="text-[var(--color-mute)]">{t(`${key}Subtitle`)}</span>
                </p>

                {/* Body */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-mute)]">
                  {t(`${key}Body`)}
                </p>

                {/* Chevron */}
                <span
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-light text-[var(--color-line)] transition-colors group-hover:text-[var(--accent)]"
                  aria-hidden
                >
                  ›
                </span>
              </article>
            </Reveal>
          ))}

          {/* Testimonial card */}
          <Reveal preset="fadeUp" delay={0.24}>
            <article
              className="flex h-full flex-col rounded-2xl p-6 shadow-[var(--shadow-card)]"
              style={{ background: 'linear-gradient(135deg, var(--brand-from), var(--brand-to))' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {t('testimonialHeading')}
              </p>

              <blockquote className="mt-4 flex-1 text-lg font-semibold leading-snug text-white">
                &ldquo;{t('testimonialQuote')}&rdquo;
              </blockquote>

              <footer className="mt-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&auto=format&fit=crop&q=80"
                      alt={t('testimonialAuthor')}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-white/80">
                    {t('testimonialAuthor')}
                  </span>
                </div>
                <div className="mt-3 flex gap-0.5 text-[var(--brand-to)]" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} aria-hidden className="text-sm">★</span>
                  ))}
                </div>
              </footer>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
