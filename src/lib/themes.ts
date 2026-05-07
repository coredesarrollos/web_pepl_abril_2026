/**
 * PEpL brand themes — single source of truth.
 * Mirrors brand/palettes.json (kept in sync; update both together).
 *
 * Each theme is a gradient that always lands on the brand anchor (Naranja).
 * The active theme drives `--accent`, `--brand-from`, `--brand-to` CSS vars
 * via <ThemeProvider> in <html data-theme="...">.
 */

export const BRAND_ANCHOR = '#F58634' as const;

export type ThemeId = 'accion' | 'energia' | 'autoconocimiento' | 'estructura';

export type Theme = {
  id: ThemeId;
  /** Spanish + English display names */
  name: { es: string; en: string };
  /** Spanish + English concept tagline */
  concept: { es: string; en: string };
  /** Gradient start = primary accent */
  from: string;
  /** Gradient end (always BRAND_ANCHOR) */
  to: string;
  /** Convenience alias for the focal hue (= from) */
  accent: string;
};

export const THEMES: readonly Theme[] = [
  {
    id: 'accion',
    name: { es: 'Tomar acción', en: 'Take action' },
    concept: { es: 'acción · impulso · decisión', en: 'action · impulse · decision' },
    from: '#E91E5A',
    to: BRAND_ANCHOR,
    accent: '#E91E5A',
  },
  {
    id: 'energia',
    name: { es: 'Energía interior', en: 'Inner energy' },
    concept: {
      es: 'identidad · intensidad · transformación',
      en: 'identity · intensity · transformation',
    },
    from: '#FF1493',
    to: BRAND_ANCHOR,
    accent: '#FF1493',
  },
  {
    id: 'autoconocimiento',
    name: { es: 'Autoconocimiento', en: 'Self-awareness' },
    concept: {
      es: 'conocimiento · estrategia · liderazgo',
      en: 'knowledge · strategy · leadership',
    },
    from: '#3F1E9B',
    to: BRAND_ANCHOR,
    accent: '#3F1E9B',
  },
  {
    id: 'estructura',
    name: { es: 'Estructura', en: 'Structure' },
    concept: {
      es: 'tecnología · sistema · control',
      en: 'technology · system · control',
    },
    from: '#00B7E9',
    to: BRAND_ANCHOR,
    accent: '#00B7E9',
  },
] as const;

export const DEFAULT_THEME: ThemeId = 'energia';

export function getTheme(id: ThemeId | string | undefined): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES.find((t) => t.id === DEFAULT_THEME)!;
}

export function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === 'string' &&
    THEMES.some((t) => t.id === value)
  );
}
