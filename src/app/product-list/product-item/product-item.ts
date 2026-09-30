import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-product-item',
  styleUrl: './product-item.scss',
  template: /*html*/`
    <div class="product-wrapper">
      <p>{{ product().name }} - {{ product().price }}zł</p>
      <button>Dodaj do koszyka</button>
    </div>
  `,
})
export class ProductItem {
  readonly product = input.required<{ id: number; name: string; price: number }>();
}
