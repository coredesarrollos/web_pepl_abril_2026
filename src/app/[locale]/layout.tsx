import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';
import { cookies } from 'next/headers';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeAutoCycler } from '@/components/theme/ThemeAutoCycler';
import { ClarityScript } from '@/components/analytics/ClarityScript';
import { isThemeId, DEFAULT_THEME, type ThemeId } from '@/lib/themes';
import { getOfficialTheme } from '@/lib/official-theme';
import { routing } from '@/i18n/routing';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap',
  variable: '--font-nunito',
});

type Params = { locale: string };

function isLocale(v: unknown): v is (typeof routing.locales)[number] {
  return typeof v === 'string' && (routing.locales as readonly string[]).includes(v);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('pepl_theme')?.value;
  const official = await getOfficialTheme();
  const initialTheme: ThemeId = isThemeId(themeCookie) ? themeCookie : official ?? DEFAULT_THEME;

  return (
    <html lang={locale} data-theme={initialTheme} className={`${inter.variable} ${nunito.variable}`} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider initialTheme={initialTheme}>
            <ThemeAutoCycler />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <ClarityScript />
      </body>
    </html>
  );
}
