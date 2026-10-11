import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products_base.service';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { RedZoomDirective } from '@insightfulio/ngx-red-zoom';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  imports: [MatCardModule, NgOptimizedImage, RedZoomDirective, MatButtonModule],
  selector: 'app-product-page',
  styleUrl: './product-page.scss',

  template: `
    @if (product) {
      <mat-card class="main-product-card">
        <div class="product-layout">
          <div class="product-image">
            <img
              [src]="product.imageSrc"
              [redZoom]="product.imageSrc"
              redZoomClass="red-zoom--style--window"
              redZoomBehavior="hover"
              alt="Zdjęcie produktu"
            />
          </div>

          <div class="product-details">
            <h1 class="product-title">{{ product.name }}</h1>

            <p class="product-description">{{ product.description }}</p>

            <p class="product-price">{{ product.price }} zł</p>

            <div class="product-actions">
              <button mat-raised-button color="primary" (click)="addThisToCart()">
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
      </mat-card>
    } @else {
      <p>Nie znaleziono produktu.</p>
    }
  `,
})
export class ProductPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductService);

  product = this.getCurrentProductInfo();

  zoomed = false;

  getCurrentProductInfo() {
    const productIdString = this.route.snapshot.queryParamMap.get('product_id');

    const productId = productIdString ? Number(productIdString) : undefined;

    return productId !== undefined ? this.productsService.getProduct(productId) : undefined;
  }

  snackBar = inject(MatSnackBar);

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
