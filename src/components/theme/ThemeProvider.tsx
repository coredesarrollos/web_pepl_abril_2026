'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { THEMES, isThemeId, type Theme, type ThemeId } from '@/lib/themes';

type ThemeContextValue = {
  theme: Theme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: readonly Theme[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: ThemeId;
  children: React.ReactNode;
}) {
  const [themeId, setThemeId] = useState<ThemeId>(initialTheme);

  // Sync attribute + cookie when changed client-side
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
    document.cookie = `pepl_theme=${themeId}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }, [themeId]);

  const setTheme = useCallback((id: ThemeId) => {
    if (isThemeId(id)) setThemeId(id);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeId,
      theme: THEMES.find((t) => t.id === themeId) ?? THEMES[0]!,
      setTheme,
      themes: THEMES,
    }),
    [themeId, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
