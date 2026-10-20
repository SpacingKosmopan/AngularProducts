import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products_base.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-product-page',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatListModule, NgxImageZoomModule],
  styleUrl: './product-page.scss',
  templateUrl: './product-page.html',
})
export class ProductPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductService);
  snackBar = inject(MatSnackBar);

  zoomed = false;

  product = this.getCurrentProductInfo();

  avgReview = computed(() => {
    const reviews = this.product?.reviews;
    if (!reviews || reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.value, 0);
    return (sum / reviews.length).toFixed(1); // Zwraca np. 4.5
  });

  getCurrentProductInfo() {
    const productIdString = this.route.snapshot.queryParamMap.get('product_id');
    const productId = productIdString ? Number(productIdString) : undefined;
    return productId !== undefined ? this.productsService.getProduct(productId) : undefined;
  }

  addThisToCart() {
    if (this.product === undefined) {
      this.snackBar.open('Ta czynność się nie powiodła', 'OK', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      return;
    }
    this.productsService.addProduct(this.product);

    this.snackBar.open('Dodano do koszyka', '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
