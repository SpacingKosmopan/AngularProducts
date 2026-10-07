import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatButtonModule, MatIconModule, RouterLink],
  selector: 'app-product-item',
  styleUrl: './product-item.scss',
  template: /*html*/ `
    <div class="product-row">
      <div class="product-info" routerLink="/">
        <span class="product-name">{{ product().name }}</span>
        <span class="product-price">{{ product().price }} zł</span>
      </div>

      <button mat-flat-button color="primary" class="add-btn" (click)="addProduct()">
        <mat-icon>add_shopping_cart</mat-icon>Dodaj do koszyka
      </button>
    </div>
  `,
})
export class ProductItem {
  readonly product = input.required<Product>();
  readonly isInCart = input<boolean>();

  readonly addProductEvent = output<Product>();

  addProduct() {
    this.addProductEvent.emit(this.product());
  }
}
