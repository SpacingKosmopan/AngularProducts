import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-product-item',
  styleUrl: './product-item.scss',
  template: /*html*/ `
    <div class="product-wrapper">
      <p>{{ product().name }} - {{ product().price }}zł</p>

      <button (click)="addProduct()">Dodaj do koszyka</button>
    </div>
  `,
})
export class ProductItem {
  readonly product = input.required<Product>();
  readonly isInCart = input<boolean>();

  readonly addProductEvent = output<Product>();

  addProduct() {
    console.log('Product wants to be added');
    this.addProductEvent.emit(this.product());
  }
}
