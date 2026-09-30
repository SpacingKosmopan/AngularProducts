import { Component, input, output } from '@angular/core';
import { ProductItem } from './product-item/product-item';

@Component({
  selector: 'app-product-list',
  template: `
    @for (product of products(); track product.id) {
      <app-product-item [product]="product" (addProductEvent)="addProduct($event)" />
    }
  `,
  styleUrl: './product-list.scss',
  imports: [ProductItem],
})
export class ProductList {
  readonly products = input.required<Product[]>();

  readonly addProductEvent = output<Product>();
  readonly removeProductEvent = output<number>();

  addProduct(product: Product) {
    console.log('Product on the list wants to be added');
    this.addProductEvent.emit(product);
  }

  removeProduct(productTRMV: number) {
    this.removeProductEvent.emit(productTRMV);
  }
}
