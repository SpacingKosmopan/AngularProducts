import { Component, input, output, computed, inject } from '@angular/core';
import { ProductService } from '../products.service';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { RouterLink } from '@angular/router';

@Component({
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterLink,
  ],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart {
  productsService = inject(ProductService);

  price = computed(() =>
    this.productsService
      .getCart()
      .reduce((acc, product) => acc + product.data.price * product.amount, 0),
  );

  removeProduct(id: number) {
    this.productsService.removeProduct(id);
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product);
  }
}
