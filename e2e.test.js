import { test, expect } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com/';

async function login(page) {
    await page.goto(baseURL);
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await page.waitForLoadState('networkidle');
}

test.describe('Sauce Demo – Користувацькі сценарії', () => {

    test('Сортування товарів: Ціна від найнижчої до найвищої', async ({ page }) => {
        await login(page);
        await page.selectOption('.product_sort_container', { label: 'Price (low to high)' });

        const prices = await page.locator('.inventory_item_price').allTextContents();
        const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));

        for (let i = 1; i < numericPrices.length; i++) {
            expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
        }
    });

    test('Додавання та видалення товару з кошика', async ({ page }) => {
        await login(page);

        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');

        await page.click('.shopping_cart_link');
        await page.click('[data-test="remove-sauce-labs-backpack"]');

        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });

    test('Перехід на сторінку товару', async ({ page }) => {
        await login(page);

        await page.click('.inventory_item_name:has-text("Sauce Labs Backpack")');

        const productName = await page.locator('.inventory_details_name').textContent();
        expect(productName).toContain('Sauce Labs Backpack');

        const productPrice = await page.locator('.inventory_details_price').textContent();
        expect(productPrice).toMatch(/\$\d+(\.\d{2})?/);
    });

    test('Успішний вихід з облікового запису', async ({ page }) => {
        await login(page);

        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('#logout_sidebar_link', { timeout: 10000 });

        await page.click('#logout_sidebar_link');

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('#login-button')).toBeVisible();
    });

});
