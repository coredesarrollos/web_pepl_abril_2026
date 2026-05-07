import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/ui/Reveal';
import { HeroStatCard } from './HeroStatCard';

const BADGES = [
  { icon: '⚡', key: 'badge1' as const },
  { icon: '✓', key: 'badge2' as const },
  { icon: '📊', key: 'badge3' as const },
];

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
      style={{
        minHeight: 'calc(100dvh - 4.5rem)',
        background: 'linear-gradient(135deg, var(--brand-from) 0%, var(--brand-to) 100%)',
      }}
    >
      {/* ── Right column: photo (desktop only) ─────────────────────────── */}
      <div
        className="absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        aria-hidden
      >
        <div className="relative h-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&auto=format&q=80"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover object-[65%_20%]"
          />
          {/* Fade photo into gradient on the left edge */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, var(--brand-from) 0%, transparent 42%)',
            }}
          />
          {/* Subtle bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{
              background: 'linear-gradient(to top, var(--brand-to), transparent)',
            }}
          />
        </div>

        {/* Floating stat card – inside photo wrapper so it stays on the photo */}
        <HeroStatCard
          label={t('statLabel')}
          value={t('statValue')}
          sublabel={t('statSublabel')}
        />
      </div>

      {/* Mobile photo background (hidden on lg+) */}
      <div className="absolute inset-0 -z-10 lg:hidden" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, var(--brand-from) 0%, var(--brand-to) 100%)', opacity: 0.88 }}
        />
      </div>

      {/* ── Left column: text content ───────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-xl lg:max-w-lg">
          <Reveal preset="fadeUp">
            <h1
              className="text-5xl font-extrabold leading-[1.06] tracking-tight text-white md:text-6xl lg:text-[5.25rem]"
            >
              <span className="block">{t('title')}</span>
              <span
                className="block"
                style={{ color: 'var(--brand-to)', WebkitTextStroke: '0px' }}
              >
                {t('title2')}
              </span>
            </h1>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.12} className="mt-6">
            <p className="text-lg font-medium leading-relaxed text-white/80 md:text-xl">
              {t('subtitle')}
            </p>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.22} className="mt-8">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold shadow-lg transition-opacity hover:opacity-90"
                style={{ color: 'var(--brand-from)' }}
              >
                {t('ctaPrimary')}
              </Link>
              <Link
                href="/#how"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t('ctaSecondary')} →
              </Link>
            </div>
          </Reveal>

          <Reveal preset="fadeUp" delay={0.32} className="mt-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/80">
              {BADGES.map(({ icon, key }) => (
                <li key={key} className="flex items-center gap-2">
                  <span aria-hidden>{icon}</span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
