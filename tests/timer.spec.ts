import { test, expect } from '@playwright/test';

test.describe('Timers', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
    await page.getByRole('button', { name: /Timers/i }).click();
  });

  test('pomodoro start/pause/reset and settings', async ({ page }) => {
    // Start Pomodoro
    await page.click('#pomodoro-start-btn');
    await expect(page.locator('#pomodoro-status')).toHaveText(/Work Time|Focus|running/i);
    await page.click('#pomodoro-pause-btn');
    await expect(page.locator('#pomodoro-status')).toHaveText(/Paused/);

    // Change settings to small numbers and reset
    await page.fill('#work-duration', '1');
    await page.fill('#short-break', '1');
    await page.fill('#long-break', '1');
    await page.click('#pomodoro-reset-btn');
    await expect(page.locator('#pomodoro-time')).toHaveText('01:00');
  });

  test('custom timer set/start/pause/reset', async ({ page }) => {
    // Switch to Custom tab
    await page.getByRole('button', { name: /Custom Timer/i }).click();

    await page.fill('#custom-hours', '0');
    await page.fill('#custom-minutes', '0');
    await page.fill('#custom-seconds', '5');
    await page.click('#set-custom-timer-btn');

    await expect(page.locator('#custom-status')).toHaveText(/Ready to start|Timer set/i);

    await page.click('#custom-start-btn');
    await expect(page.locator('#custom-status')).toHaveText(/running/i);
    await page.click('#custom-pause-btn');
    await expect(page.locator('#custom-status')).toHaveText(/paused/i);
    await page.click('#custom-reset-btn');
    await expect(page.locator('#custom-status')).toHaveText(/Ready to start|Set your timer/i);
  });
});


