import { Component, input, inject } from '@angular/core';
import { ProductService } from '../products_base.service';
import { ProductItem } from './product-item/product-item';
import { MatListModule } from '@angular/material/list';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  template: /*html*/ `
    <mat-list class="product-material-list">
      @for (product of this.productsService.getProducts(); track product.id) {
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
  productsService = inject(ProductService);

  private snackBar = inject(MatSnackBar);

  addProduct(product: Product) {
    console.log('Product on the list wants to be added');
    this.productsService.addProduct(product);
    this.snackBar.open('Dodano do koszyka', '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
