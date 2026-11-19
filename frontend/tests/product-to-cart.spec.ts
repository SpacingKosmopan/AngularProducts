import { test, expect } from '@playwright/test';

test('is the product added to cart and the amount can be changed', async ({ page }) => {
  await page.route('http://localhost:8000/products', async (route) => {
    await route.fulfill({
      json: [
        { id: 0, name: 'string', price: 0, imageSrc: 'string', description: 'string', reviews: [] },
        { id: 0, name: 'string', price: 0, imageSrc: 'string', description: 'string', reviews: [] },
        { id: 0, name: 'string', price: 0, imageSrc: 'string', description: 'string', reviews: [] },
        { id: 0, name: 'string', price: 0, imageSrc: 'string', description: 'string', reviews: [] },
        { id: 0, name: 'string', price: 0, imageSrc: 'string', description: 'string', reviews: [] },
      ],
    });
  });

  await page.goto('http://localhost:4200/products');

  await expect(page.locator('app-product-item')).toContainText('string');
  const button = page.getByRole('button', { name: 'Dodaj do koszyka' });
  console.log('Znaleziono przycisków:', await button.count());
  await button.first().click();

  /* /?/ - regex */
  /* //i case insensitive */
  await page.getByRole('link', { name: /koszyk/i }).click();

  const product = page.locator('mat-card-content mat-list-item').filter({ hasText: /string/ });
  console.log('Znaleziono:', await product.count());

  await product.getByTestId('add-btn').click();
  await expect(product).toContainText('2x');

  await product.getByTestId('remove-btn').click();
  await expect(product).toContainText('1x');
});
