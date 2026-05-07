/**
 * Lee el tema oficial servido a usuarios anónimos. Cae al default si Sanity no
 * está configurado o falla. Cacheado bajo el tag `site-theme` (revalidado por
 * `/api/revalidate`).
 */
import { client } from './sanity';
import { DEFAULT_THEME, isThemeId, type ThemeId } from './themes';

export async function getOfficialTheme(): Promise<ThemeId> {
  if (!client) return DEFAULT_THEME;
  try {
    const data = await client.fetch<{ active?: string } | null>(
      '*[_type == "siteTheme" && _id == "siteTheme"][0]{active}',
      {},
      { next: { tags: ['site-theme'], revalidate: 60 } }
    );
    const active = data?.active;
    return isThemeId(active) ? active : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}
