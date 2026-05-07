import { test, expect } from '@playwright/test';

test('landing renders hero and theme switcher', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('radiogroup', { name: /estilo visual|visual style/i })).toBeVisible();
});

test('switching theme updates the document attribute', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const initial = await html.getAttribute('data-theme');
  // Click a non-active theme swatch
  const swatches = page.getByRole('radio');
  await swatches.nth(2).click();
  await expect(html).not.toHaveAttribute('data-theme', initial ?? '');
});

test('locale switcher routes to /en', async ({ page }) => {
  await page.goto('/');
  const sw = page.getByRole('button', { name: /switch language/i });
  await sw.click();
  await expect(page).toHaveURL(/\/en\/?$/);
});
