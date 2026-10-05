import { Component, input, output, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatListModule],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  template: /*html*/ `
    @if (cart().length === 0) {
      <p class="empty-cart-msg">Koszyk jest pusty</p>
    } @else {
      <mat-list class="cart-material-list">
        @for (product of cart(); track product.idInCart) {
          <mat-list-item>
            <div class="cart-item-row">
              <div class="item-info">
                <span class="item-name">{{ product.data.name }}</span>
                <span class="item-price">{{ product.data.price }} zł</span>
              </div>

              <button
                mat-flat-button
                class="remove-button"
                (click)="removeProduct(product.idInCart)"
              >
                <mat-icon>delete</mat-icon>
                <span>Usuń</span>
              </button>
            </div>
          </mat-list-item>
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
  readonly cart = input.required<{ idInCart: number; data: Product }[]>();

  price = computed(() => this.cart().reduce((acc, product) => acc + product.data.price, 0));

  readonly removeProductEvent = output<number>();

  removeProduct(id: number) {
    this.removeProductEvent.emit(id);
  }
}
