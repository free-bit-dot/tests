const { test, expect } = require('@playwright/test');

test.describe('E2E тести для automationexercise.com', () => {

  test('Головна сторінка завантажується', async ({ page }) => {
    await page.goto('https://www.automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator('#header')).toBeVisible();
  });

  test('Пошук товару "dress" через вкладку Products', async ({ page }) => {
    await page.goto('https://www.automationexercise.com');

    // Переходимо у вкладку Products
    await page.locator('a[href="/products"]').click();
    await expect(page).toHaveURL(/.*\/products/);

    // Очікуємо поле пошуку
    const searchInput = page.locator('#search_product');
    await searchInput.waitFor({ state: 'visible' });

    // Вводимо пошуковий запит
    await searchInput.fill('dress');

    const searchButton = page.locator('#submit_search');
    await searchButton.click();

    // Очікуємо на результати
    const results = page.locator('.productinfo.text-center');
    await expect(results.first()).toBeVisible();
  });

});
