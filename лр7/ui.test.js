import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://demoqa.com');
});

test.describe('DemoQA - Text Box Page', () => {
    test('Перевірка введення даних у текстові поля', async ({page}) => {
        await page.goto('https://demoqa.com/text-box');
        await page.fill('#userName', 'John Doe');
        await page.fill('#userEmail', 'john.doe@example.com');
        await page.fill('#currentAddress', '123 Main St');
        await page.fill('#permanentAddress', '456 Secondary St');
        await page.click('#submit');

        const outputName = await page.textContent('#output #name');
        expect(outputName).toContain('John Doe');
    });
});

test.describe('DemoQA - Radio Button Page', () => {
    test('Перевірка вибору радіо-кнопки "Yes"', async ({page}) => {
        await page.goto('https://demoqa.com/radio-button');
        await page.click('label[for="yesRadio"]');
        const resultText = await page.textContent('.text-success');
        expect(resultText).toBe('Yes');
    });
});

test.describe('DemoQA - Check Box Page', () => {
    test('Перевірка вибору декількох чекбоксів', async ({page}) => {
        await page.goto('https://demoqa.com/checkbox');
        await page.click('button[title="Toggle"]');
        await page.click('label[for="tree-node-desktop"]');
        await page.click('label[for="tree-node-downloads"]');
        const result = await page.textContent('#result');
        expect(result).toContain('desktop');
        expect(result).toContain('downloads');
    });
});

test.describe('DemoQA - Select Menu Page', () => {
    test('Перевірка вибору значення зі стандартного селекту', async ({ page }) => {
        await page.goto('https://demoqa.com/select-menu');
        await page.selectOption('#oldSelectMenu', { label: 'Green' });
        const selectedValue = await page.$eval('#oldSelectMenu', select => select.value);

        expect(selectedValue).toBe('2');
    });
});



test.describe('DemoQA - Dynamic Properties Page', () => {
    test('Перевірка, що кнопка стає активною після затримки і залишається видимою', async ({ page }) => {
        await page.goto('https://demoqa.com/dynamic-properties');
        const button = page.locator('#enableAfter');
        await expect(button).toBeEnabled({ timeout: 6000 });
        await button.click();
        await expect(button).toBeVisible();
    });
});

