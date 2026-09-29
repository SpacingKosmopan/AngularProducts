import { Component, input } from '@angular/core';
import { ProductItem } from './product-item/product-item';

@Component({
  selector: 'app-product-list',
  template: `
    @for (product of products(); track product.id) {
      <app-product-item [product]="product" />
    }
  `,
  styleUrl: './product-list.scss',
  imports: [ProductItem],
})
export class ProductList {
  readonly products = input.required<{ id: number; name: string; price: number }[]>();
}
