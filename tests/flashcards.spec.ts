import { test, expect } from '@playwright/test';

test.describe('Flashcards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
    await page.getByRole('button', { name: /Flashcards/i }).click();
  });

  test('create, view, flip, navigate and delete all', async ({ page }) => {
    // Initially shows no cards message
    await expect(page.locator('#no-cards-message')).toBeVisible();

    // Add a card
    await page.fill('#card-front', 'Q: What is 2+2?');
    await page.fill('#card-back', 'A: 4');
    await page.click('#add-card-btn');

    // Card visible
    await expect(page.locator('#current-flashcard')).toBeVisible();
    await expect(page.locator('#card-front-content .card-text')).toHaveText('Q: What is 2+2?');

    // Flip
    await page.click('#flip-card-btn');
    await expect(page.locator('#card-back-content .card-text')).toHaveText('A: 4');

    // Shuffle and reset should not error
    await page.click('#shuffle-cards-btn');
    await page.click('#reset-study-btn');

    // Delete all
    page.on('dialog', d => d.accept());
    await page.click('#delete-all-cards-btn');
    await expect(page.locator('#no-cards-message')).toBeVisible();
  });
});


