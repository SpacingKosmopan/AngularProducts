import { Component, input } from '@angular/core';
import { ProductItem } from './product-item/product-item';

@Component({
  selector: 'app-product-list',
  template: `
    @for (product of products(); track product.id) {
      <app-product-item [product]="product" (addProductEvent)="addProduct($event)" />
    }
    <hr />
    W koszyku:
    @for (product of cart; track product.idInCart) {
      <app-product-item
        [product]="product.data"
        (addProductEvent)="addProduct($event)"
        (removeProductEvent)="removeProduct($event)"
        [isInCart]="true"
        [productIdInCart]="product.idInCart"
      />
    }
  `,
  styleUrl: './product-list.scss',
  imports: [ProductItem],
})
export class ProductList {
  readonly products = input.required<Product[]>();

  cart = new Array();

  addProduct(product: Product) {
    this.cart.push({ data: product, idInCart: this.cart.length });
  }

  removeProduct(productTRMV: number) {
    this.cart = this.cart.filter((product) => product.idInCart !== productTRMV);
  }
}
