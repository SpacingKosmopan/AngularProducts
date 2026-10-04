import { Component, input, output } from '@angular/core';
import { ProductItem } from './product-item/product-item';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-product-list',
  template: /*html*/ `
    <mat-list class="product-material-list">
      @for (product of products(); track product.id) {
        <mat-list-item class="product-list-item">
          <app-product-item [product]="product" (addProductEvent)="addProduct($event)" />
        </mat-list-item>
      }
    </mat-list>
  `,
  styleUrl: './product-list.scss',
  imports: [ProductItem, MatListModule],
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
