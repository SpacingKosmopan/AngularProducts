import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-product-item',
  styleUrl: './product-item.scss',
  template: `<p>{{ product().name }} - {{ product().price }}</p>`,
})
export class ProductItem {
  readonly product = input.required<{ id: number; name: string; price: number }>();
}
