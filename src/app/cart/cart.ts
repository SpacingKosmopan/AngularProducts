import { Component, input, output, computed, inject } from '@angular/core';
import { ProductService } from '../products_base.service';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardActions } from '@angular/material/card';

import { RouterLink } from '@angular/router';

@Component({
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatCardActions,
    RouterLink,
  ],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  template: /*html*/ `
    @if (this.productsService.getCart().length === 0) {
      <p class="empty-cart-msg">Koszyk jest pusty</p>
    } @else {
      <mat-list class="cart-material-list">
        @for (product of this.productsService.getCart(); track product.data.id) {
          <mat-list-item>
            <div class="cart-item-row">
              <div class="item-info">
                <span class="item-name">{{ product.data.name }} &nbsp; {{ product.amount }}x</span>

                <span class="item-price">{{ product.data.price }} zł</span>
              </div>

              <div class="cart-product-actions">
                <button mat-flat-button (click)="addProduct(product.data)">
                  <mat-icon>add</mat-icon>
                </button>
                <button mat-flat-button (click)="removeProduct(product.data.id)">
                  <mat-icon>remove</mat-icon>
                </button>
              </div>
            </div>
          </mat-list-item>
        }
      </mat-list>

      <mat-divider class="cart-divider"></mat-divider>

      <div class="cart-summary">
        <span class="summary-label">RAZEM:</span>
        <span class="summary-value">{{ price() }} zł</span>
      </div>
      <mat-card-actions class="cart-actions">
        <button mat-raised-button color="primary" routerLink="/paying">Zamów</button>
      </mat-card-actions>
    }
  `,
})
export class Cart {
  productsService = inject(ProductService);

  price = this.getNewPrice();

  getNewPrice() {
    return computed(() =>
      this.productsService
        .getCart()
        .reduce((acc, product) => acc + product.data.price * product.amount, 0),
    );
  }

  removeProduct(id: number) {
    this.productsService.removeProduct(id);
    this.price = this.getNewPrice();
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product);
    this.price = this.getNewPrice();
  }
}
