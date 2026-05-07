import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'PEpL', template: '%s — PEpL' },
  description: 'Publicidad emocional por logro.',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F58634',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
