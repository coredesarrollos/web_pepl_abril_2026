'use client';

import Image from 'next/image';
import { useTheme } from '@/components/theme/ThemeProvider';

const WORDMARK: Record<string, string> = {
  energia:          '/brand/logo-wordmark-energia.png',
  accion:           '/brand/logo-wordmark-accion.png',
  autoconocimiento: '/brand/logo-wordmark-autoconocimiento.png',
  estructura:       '/brand/logo-wordmark-estructura.png',
};

/**
 * PEpL wordmark extracted directly from the official brand PDF.
 * Switches between 4 theme-correct gradient variants automatically.
 */
export function Logo({
  className,
  ariaLabel = 'PEpL',
}: {
  className?: string;
  ariaLabel?: string;
}) {
  const { themeId } = useTheme();
  const src = WORDMARK[themeId] ?? WORDMARK['energia']!;
  return (
    <Image
      src={src}
      alt={ariaLabel}
      width={132}
      height={68}
      priority
      className={className}
      style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
    />
  );
}

