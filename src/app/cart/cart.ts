import { Component, input, output, computed, inject } from '@angular/core';
import { ProductService } from '../products_base.service';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatListModule],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  template: /*html*/ `
    @if (this.productsService.getCart().length === 0) {
      <p class="empty-cart-msg">Koszyk jest pusty</p>
    } @else {
      <mat-list class="cart-material-list">
        @for (product of this.productsService.getProducts(); track product.id) {
          @if (this.productsService.getCart().find((item) => item.data.id === product.id)) {
            @let amount =
              this.productsService.getCart().filter((item) => item.data.id === product.id).length;
            <mat-list-item>
              <div class="cart-item-row">
                <div class="item-info">
                  <span class="item-name">{{ product.name }} &nbsp; {{ amount }}x</span>

                  <span class="item-price">{{ product.price }} zł</span>
                </div>

                <div class="cart-actions">
                  <button mat-flat-button class="decrease-button" (click)="addProduct(product)">
                    <mat-icon>add</mat-icon>
                  </button>
                  <button
                    mat-flat-button
                    class="increase-button remove-button"
                    (click)="removeProduct(product.id)"
                  >
                    <mat-icon>remove</mat-icon>
                  </button>
                </div>
              </div>
            </mat-list-item>
          }
        }
      </mat-list>

      <mat-divider class="cart-divider"></mat-divider>

      <div class="cart-summary">
        <span class="summary-label">RAZEM:</span>
        <span class="summary-value">{{ price() }} zł</span>
      </div>
    }
  `,
})
export class Cart {
  // readonly cart = input.required<{ idInCart: number; data: Product }[]>();
  productsService = inject(ProductService);

  price = computed(() =>
    this.productsService.getCart().reduce((acc, product) => acc + product.data.price, 0),
  );

  removeProduct(id: number) {
    this.productsService.removeProduct(id);
    this.updatePrice();
  }

  addProduct(product: Product) {
    this.productsService.addProduct(product);
    this.updatePrice();
  }

  updatePrice() {
    this.price = computed(() =>
      this.productsService.getCart().reduce((acc, product) => acc + product.data.price, 0),
    );
  }
}
