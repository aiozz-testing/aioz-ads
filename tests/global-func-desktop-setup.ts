import { test, expect } from '@playwright/test';

test('Get the resource', async ({ page }) => {
    await page.goto('https://vnexpress.net/');

    await page.context().storageState({ path: "playwright/.auth/CmsAuth.json" });
});