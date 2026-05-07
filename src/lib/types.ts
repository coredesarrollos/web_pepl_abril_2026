import type { ThemeId } from './themes';

export type SiteTheme = {
  /** Active theme id served to anonymous users. */
  active: ThemeId;
  /** When set, schedule the change for this ISO date (UTC). Future use. */
  scheduledFor?: string | null;
};
