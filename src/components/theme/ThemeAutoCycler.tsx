'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import type { ThemeId } from '@/lib/themes';

/** Themes that auto-cycle — starts at celeste (estructura), then violet */
const CYCLE_THEMES: ThemeId[] = ['estructura', 'autoconocimiento'];
const INTERVAL_MS = 600_000;

export function ThemeAutoCycler() {
  const { themeId, setTheme } = useTheme();
  const themeIdRef = useRef<ThemeId>(themeId);

  useEffect(() => {
    themeIdRef.current = themeId;
  }, [themeId]);

  // Force celeste on first load, regardless of cookie
  useEffect(() => {
    setTheme('estructura');
  }, [setTheme]);

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
