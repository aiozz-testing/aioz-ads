import { test, expect, chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const RUN_COUNT = 9999; // Set how many times you want to run
for (let i = 1; i <= RUN_COUNT; i++) {
  test.only(`Test ad with proxy - run #${i}`, async () => {
    const proxy = {
      server: 'http://p.webshare.io:80',
      username: 'qbwxoipk-rotate',
      password: '6t6zd7i806uj'
    };

    const browser = await chromium.launch({
      proxy: {
        server: proxy.server,
        username: proxy.username,
        password: proxy.password
      },
      timeout: 60 * 1000,
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.glennklockwood.com/sysadmin-howtos/rpi-wifi-island.html', {
      timeout: 60 * 10000,
      waitUntil: 'domcontentloaded'
    });

    const scriptPath = path.resolve(__dirname, '../bundle.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    await page.addScriptTag({ content: scriptContent });

    await page.locator(`//*[name()='svg' and .//*[@d='M5.93427 5.93353C6.24669 5.62111 6.75322 5.62111 7.06564 5.93353L12.5 11.3678L17.9343 5.93354C18.2467 5.62112 18.7532 5.62112 19.0656 5.93354C19.3781 6.24596 19.3781 6.75249 19.0656 7.06491L13.6313 12.4992L19.0656 17.9335C19.3781 18.2459 19.3781 18.7525 19.0656 19.0649C18.7532 19.3773 18.2467 19.3773 17.9343 19.0649L12.5 13.6306L7.06564 19.0649C6.75322 19.3773 6.24669 19.3773 5.93427 19.0649C5.62185 18.7525 5.62185 18.246 5.93427 17.9335L11.3686 12.4992L5.93427 7.0649C5.62185 6.75248 5.62185 6.24595 5.93427 5.93353Z']]`).click({ timeout: 15 * 1000 });

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });
    await page.waitForTimeout(2000);

    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber % 2 === 0) {
      await page.locator("//ins[@class='aioz-ads-inpage']").last().scrollIntoViewIfNeeded();
      await page.waitForTimeout(3000);
    } else {
      await page.locator("//ins[@class='aioz-ads-inpage']").nth(1).click();
      await page.waitForTimeout(3000);
    }

    await browser.close();
  });
}
