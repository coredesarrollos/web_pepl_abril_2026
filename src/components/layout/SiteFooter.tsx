import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/brand/Logo';

export function SiteFooter() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <Logo className="h-8 w-auto" />
          <p className="mt-4 text-sm text-[color-mix(in_oklab,var(--color-paper)_70%,transparent)]">
            {t('tagline')}
          </p>
        </div>
        <nav aria-label={t('legal')} className="text-sm">
          <h2 className="mb-3 font-semibold">{t('legal')}</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/privacidad" className="focus-ring rounded">
                {t('privacy')}
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="focus-ring rounded">
                {t('terms')}
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label={t('social')} className="text-sm">
          <h2 className="mb-3 font-semibold">{t('social')}</h2>
          <ul className="space-y-2">
            <li>
              <a href="https://instagram.com/pepl.app" className="focus-ring rounded" rel="noopener noreferrer" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/pepl" className="focus-ring rounded" rel="noopener noreferrer" target="_blank">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-[color-mix(in_oklab,var(--color-paper)_15%,transparent)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 text-xs text-[color-mix(in_oklab,var(--color-paper)_60%,transparent)]">
          <span>© {year} PEpL. {t('rights')}</span>
          <span>v0.1 · brand 2026</span>
        </div>
      </div>
    </footer>
  );
}
