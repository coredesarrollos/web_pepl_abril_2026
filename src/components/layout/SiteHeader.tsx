import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/brand/Logo';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { MobileNav } from '@/components/layout/MobileNav';

export function SiteHeader() {
  const t = useTranslations('nav');
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-line)] bg-white/95 backdrop-blur-md">
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-ink)] focus:px-3 focus:py-2 focus:text-white"
      >
        {t('skipToContent')}
      </a>
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5">
        {/* Logo */}
        <Link href="/" aria-label="PEpL · Inicio" className="focus-ring flex-shrink-0 rounded-md">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Desktop primary nav */}
        <nav aria-label="primary" className="hidden items-center gap-1 text-[13px] font-medium text-[var(--color-ink-soft)] lg:flex">
          <Link href="/#inicio" className="focus-ring rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--color-paper-soft)] hover:text-[var(--color-ink)]">
            {t('home')}
          </Link>
          <Link href="/#how" className="focus-ring rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--color-paper-soft)] hover:text-[var(--color-ink)]">
            {t('how')}
          </Link>
          <Link href="/#audiences" className="focus-ring rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--color-paper-soft)] hover:text-[var(--color-ink)]">
            {t('audiences')}
          </Link>
          <Link href="/#problema" className="focus-ring rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--color-paper-soft)] hover:text-[var(--color-ink)]">
            {t('resources')}
          </Link>
          <Link href="/#manifesto" className="focus-ring rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--color-paper-soft)] hover:text-[var(--color-ink)]">
            {t('pricing')}
          </Link>
          <Link href="/about" className="focus-ring rounded-md px-2.5 py-1.5 transition-colors hover:bg-[var(--color-paper-soft)] hover:text-[var(--color-ink)]">
            {t('about')}
          </Link>
        </nav>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitcher />
          <Link
            href="/#contact"
            className="focus-ring rounded-full px-4 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(to right, var(--brand-from), var(--brand-to))' }}
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile nav (hamburger) */}
        <MobileNav />
      </div>
    </header>
  );
}
