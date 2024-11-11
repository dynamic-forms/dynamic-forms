import { expect, test } from '@playwright/test';

test.describe('dynamic-forms demo app', () => {
  test('has url and title', async ({ page }) => {
    await page.goto('http://localhost:4200/home');

    await expect(page).toHaveURL('/home');
    await expect(page).toHaveTitle('dynamic-forms');
  });
});
