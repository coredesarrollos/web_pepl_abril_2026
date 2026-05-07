'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { type Locale } from '@/i18n/routing';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale() as Locale;
  const next: Locale = current === 'es' ? 'en' : 'es';

  const close = () => setOpen(false);

  const links = [
    { href: '/#inicio', label: t('home') },
    { href: '/#how', label: t('how') },
    { href: '/#audiences', label: t('audiences') },
    { href: '/#problema', label: t('resources') },
    { href: '/#manifesto', label: t('pricing') },
    { href: '/about', label: t('about') },
  ];

  return (
    <div className="flex items-center gap-2 lg:hidden">
      {/* Mobile CTA */}
      <Link
        href="/#contact"
        onClick={close}
        className="rounded-full px-4 py-1.5 text-sm font-semibold text-white"
        style={{ background: 'linear-gradient(to right, var(--brand-from), var(--brand-to))' }}
      >
        {t('cta')}
      </Link>

      {/* Hamburger */}
      <button
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md text-[var(--color-ink)]"
      >
        <span className={`block h-0.5 w-5 bg-current transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block h-0.5 w-5 bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-5 bg-current transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-[var(--color-line)] bg-white/98 px-6 py-4 shadow-lg backdrop-blur-md">
          <nav className="flex flex-col gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-paper-soft)] hover:text-[var(--color-ink)]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2 border-t border-[var(--color-line)] pt-4">
            <button
              type="button"
              onClick={() => { router.replace(pathname, { locale: next }); close(); }}
              className="rounded-full border border-[var(--color-line)] bg-[var(--color-paper-soft)] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--color-ink-soft)]"
            >
              {next === 'es' ? 'ES' : 'EN'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
