import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AhausAngular/i);
});

test('should display welcome message', async ({ page }) => {
  await page.goto('/');

  // Expects page to have a heading with the name of Installation.
  const locator = page.locator('app-root h1');
  await expect(locator).toHaveText('Identifícate');
});
