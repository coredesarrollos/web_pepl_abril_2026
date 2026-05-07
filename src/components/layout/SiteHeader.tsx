import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/brand/Logo';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';

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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3">
        {/* Logo */}
        <Link href="/" aria-label="PEpL · Inicio" className="focus-ring flex-shrink-0 rounded-md">
          <Logo className="h-9 w-auto" />
        </Link>

        {/* Primary nav */}
        <nav aria-label="primary" className="hidden items-center gap-6 text-sm font-medium text-[var(--color-ink-soft)] md:flex">
          <Link href="/#inicio" className="focus-ring rounded transition-colors hover:text-[var(--accent)]">
            {t('home')}
          </Link>
          <Link href="/#how" className="focus-ring rounded transition-colors hover:text-[var(--accent)]">
            {t('how')}
          </Link>
          <Link href="/#audiences" className="focus-ring rounded transition-colors hover:text-[var(--accent)]">
            {t('audiences')}
          </Link>
          <Link href="/#problema" className="focus-ring rounded transition-colors hover:text-[var(--accent)]">
            {t('resources')}
          </Link>
          <Link href="/#manifesto" className="focus-ring rounded transition-colors hover:text-[var(--accent)]">
            {t('pricing')}
          </Link>
          <Link href="/about" className="focus-ring rounded transition-colors hover:text-[var(--accent)]">
            {t('about')}
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </div>

          {/* Ghost: Inicia sesión */}
          <Link
            href="/#contact"
            className="focus-ring hidden rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-flex"
          >
            {t('signin')}
          </Link>

          {/* Filled CTA: Empieza ahora */}
          <Link
            href="/#contact"
            className="focus-ring rounded-full px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(to right, var(--brand-from), var(--brand-to))' }}
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </header>
  );
}
