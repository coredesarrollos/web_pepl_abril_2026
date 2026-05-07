import { describe, expect, it } from 'vitest';
import { THEMES, getTheme, isThemeId, BRAND_ANCHOR } from '@/lib/themes';

describe('themes', () => {
  it('exposes exactly the four official PEpL gradients', () => {
    expect(THEMES.map((t) => t.id)).toEqual([
      'accion',
      'energia',
      'autoconocimiento',
      'estructura',
    ]);
  });

  it('every theme lands on the brand anchor (Naranja)', () => {
    for (const t of THEMES) expect(t.to.toLowerCase()).toBe(BRAND_ANCHOR.toLowerCase());
  });

  it('isThemeId guards correctly', () => {
    expect(isThemeId('accion')).toBe(true);
    expect(isThemeId('nope')).toBe(false);
    expect(isThemeId(undefined)).toBe(false);
  });

  it('getTheme falls back to default when id is unknown', () => {
    expect(getTheme('not-a-theme').id).toBe('energia');
  });
});
