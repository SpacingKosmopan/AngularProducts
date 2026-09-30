import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-product-item',
  styleUrl: './product-item.scss',
  template: /*html*/ `
    <div class="product-wrapper">
      <p>{{ product().name }} - {{ product().price }}zł</p>
      @if (!isInCart()) {
        <button (click)="addProduct()">Dodaj do koszyka</button>
      } @else {
        <button (click)="removeProduct()">Usuń z koszyka</button>
      }
    </div>
  `,
})
export class ProductItem {
  readonly product = input.required<Product>();
  readonly isInCart = input<boolean>();
  readonly productIdInCart = input<number>(-999);

  readonly addProductEvent = output<Product>();
  readonly removeProductEvent = output<number>();

  addProduct() {
    this.addProductEvent.emit(this.product());
  }

  removeProduct() {
    if (
      (!this.productIdInCart() && this.productIdInCart() !== 0) ||
      this.productIdInCart() === undefined
    )
      return;

    this.removeProductEvent.emit(this.productIdInCart());
  }
}
