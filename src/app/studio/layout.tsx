/**
 * Studio se sirve fuera del scope `[locale]` para evitar el wrapper de i18n
 * y los headers de tema. Mantiene su propio shell mínimo.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PEpL Studio',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
