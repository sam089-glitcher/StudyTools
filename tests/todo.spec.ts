import { test, expect } from '@playwright/test';

test.describe('To-Do List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
    await page.getByRole('button', { name: /To-Do List/i }).click();
  });

  test('can add, complete, filter and clear tasks', async ({ page }) => {
    // Ensure initial stats
    await expect(page.locator('#total-tasks')).toHaveText(/\d+/);

    // Add a task
    await page.fill('#todo-input', 'Write E2E test');
    await page.selectOption('#priority-select', 'high');
    await page.click('#add-todo-btn');

    // Task should appear
    const item = page.locator('.todo-item').first();
    await expect(item).toContainText('Write E2E test');
    await expect(item.locator('.todo-priority')).toHaveText(/high/i);

    // Complete it
    await item.locator('.todo-checkbox').check();
    await expect(item).toHaveClass(/completed/);

    // Filter completed
    await page.click('.filter-btn[data-filter="completed"]');
    await expect(page.locator('.todo-item')).toHaveCount(1);

    // Clear completed
    page.on('dialog', d => d.accept());
    await page.click('#clear-completed-btn');
    await expect(page.locator('#todo-list')).toContainText('No tasks to display.');
  });
});


