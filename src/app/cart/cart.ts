import { Component, input, output, computed } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  template: `
    @if (cart().length === 0) {
      <p>Koszyk jest pusty</p>
    } @else {
      @for (product of cart(); track product.idInCart) {
        <div class="product-wrapper">
          <p>{{ product.data.name }} - {{ product.data.price }}zł</p>
          <button (click)="removeProduct(product.idInCart)">Usuń</button>
        </div>
      }
      -------------------------------<br />
      RAZEM
      <div style="display:inline;margin:0 30px;"></div>
      {{ price() }}zł
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
