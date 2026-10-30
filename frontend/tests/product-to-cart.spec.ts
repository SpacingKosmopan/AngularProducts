import { test, expect } from '@playwright/test';

const mockProducts = [
  {
    id: 0,
    name: 'Klawiatura',
    price: 199,
    imageSrc: 'assets/images/keyboard.webp',
    description: 'Myszka++',
    reviews: [{ id: 0, value: 5, content: 'No fajna taka, klika se i wgl' }],
  },
  {
    id: 1,
    name: 'Mysz',
    price: 99,
    imageSrc: 'assets/images/mouse.webp',
    description: 'Kliku klik, tu i tam, pracuj pracuj',
    reviews: [],
  },
  {
    id: 2,
    name: 'Monitor',
    price: 899,
    imageSrc: 'assets/images/screen.webp',
    description: 'Kolorowe ruchome pudełko',
    reviews: [],
  },
  {
    id: 3,
    name: 'Słuchawki',
    price: 149,
    imageSrc: 'assets/images/headphones.webp',
    description: 'Takie fajne, dwuuszne...',
    reviews: [],
  },
];

test('is the product added to cart', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.getByRole('link', { name: 'Produkty' }).click();
  await expect(page.locator('app-product-item')).toContainText('string');
  await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
  await page.getByRole('link', { name: 'Koszyk' }).click();
  await expect(page.locator('mat-card-content')).toContainText('string 1x');
  await page.locator('mat-card-content').getByRole('button').filter({ hasText: 'add' }).click();
  await expect(page.locator('mat-card-content')).toContainText('string 2x');
  await page.locator('mat-card-content').getByRole('button').filter({ hasText: 'remove' }).click();
  await expect(page.locator('mat-card-content')).toContainText('string 1x');
});
