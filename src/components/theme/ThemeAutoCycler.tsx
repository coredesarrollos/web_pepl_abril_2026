'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import type { ThemeId } from '@/lib/themes';

/** Themes that auto-cycle (the two right swatches: violet & celeste) */
const CYCLE_THEMES: ThemeId[] = ['autoconocimiento', 'estructura'];
const INTERVAL_MS = 600_000;

/**
 * Silently cycles between the violet and celeste brand themes every 6 s.
 * Renders nothing — drop it anywhere inside <ThemeProvider>.
 */
export function ThemeAutoCycler() {
  const { themeId, setTheme } = useTheme();
  const themeIdRef = useRef<ThemeId>(themeId);

  useEffect(() => {
    themeIdRef.current = themeId;
  }, [themeId]);

  useEffect(() => {
    const id = setInterval(() => {
      const current = CYCLE_THEMES.indexOf(themeIdRef.current);
      const next = current === -1 ? 0 : (current + 1) % CYCLE_THEMES.length;
      setTheme(CYCLE_THEMES[next]!);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [setTheme]);

  return null;
}
