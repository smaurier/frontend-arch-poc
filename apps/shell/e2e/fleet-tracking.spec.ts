import { test, expect } from '@playwright/test';

test.describe('FleetTracking', () => {
  test('renders 5 trucks and at least one alarm', async ({ page }) => {
    await page.goto('/');
    const rows = page.locator('[data-testid="truck-row"]');
    await expect(rows).toHaveCount(5);
    await expect(page.locator('[role="alert"]').first()).toBeVisible();
  });

  test('theme toggle switches data-theme attribute', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initial = await html.getAttribute('data-theme');
    await page.getByRole('button', { name: /switch to (dark|light) theme/i }).click();
    const after = await html.getAttribute('data-theme');
    expect(after).not.toBe(initial);
  });
});
