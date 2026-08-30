import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('home page has no critical a11y violations (light)', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );
    if (critical.length > 0) {
      console.log('A11y violations (critical/serious):');
      console.log(JSON.stringify(critical, null, 2));
    }
    expect(critical).toEqual([]);
  });

  test('home page has no critical a11y violations (dark)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /switch to (dark|light) theme/i }).click();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-theme') === 'dark',
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );
    if (critical.length > 0) {
      console.log('A11y violations dark (critical/serious):');
      console.log(JSON.stringify(critical, null, 2));
    }
    expect(critical).toEqual([]);
  });

  test('home page has no critical a11y violations (fr locale)', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="locale-switcher"]').selectOption('fr');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );
    if (critical.length > 0) {
      console.log('A11y violations fr (critical/serious):');
      console.log(JSON.stringify(critical, null, 2));
    }
    expect(critical).toEqual([]);
  });
});
