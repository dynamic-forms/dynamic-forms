import { expect, test } from '@playwright/test';

test.describe('dynamic-forms demo editor', () => {
  const themes = ['bootstrap', 'material'];

  themes.forEach(theme => {
    test.describe(`for theme ${theme}`, () => {
      test('has url and title', async ({ page }) => {
        await page.goto(`http://localhost:4200/editor/${theme}`);

        await expect(page).toHaveURL(`/editor/${theme}`);
        await expect(page).toHaveTitle('dynamic-forms');
      });
    });
  });
});
