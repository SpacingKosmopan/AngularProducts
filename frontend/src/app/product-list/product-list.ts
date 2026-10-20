import { Component, input, inject } from '@angular/core';
import { ProductService } from '../products_base.service';
import { ProductItem } from './product-item/product-item';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  imports: [ProductItem, MatListModule],
})
export class ProductList {
  productsService = inject(ProductService);

  snackBar = inject(MatSnackBar);

  addProduct(product: Product) {
    this.productsService.addProduct(product);
    this.snackBar.open('Dodano do koszyka', '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
