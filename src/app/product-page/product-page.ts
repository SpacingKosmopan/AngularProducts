import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products_base.service';
import { MatCardModule } from '@angular/material/card';
import { RedZoomDirective } from '@insightfulio/ngx-red-zoom';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-product-page',
  imports: [MatCardModule, RedZoomDirective, MatButtonModule, MatIconModule, MatListModule],
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

            <p class="product-review-grade">{{ avgReview() }} <mat-icon>star-fill</mat-icon></p>

            <div class="product-actions">
              <button mat-raised-button color="primary" (click)="addThisToCart()">
                Dodaj do koszyka
              </button>
            </div>
          </div>
        </div>
      </mat-card>

      <h2>Oceny</h2>

      @if (product.reviews && product.reviews.length > 0) {
        <mat-card style="margin-top: 16px;">
          <mat-list class="product-material-list">
            @for (review of product.reviews; track review.id) {
              <mat-list-item class="product-list-item">
                <p class="review-row">
                  <span class="review-value">
                    <mat-icon>star-fill</mat-icon> {{ review.value }}
                  </span>
                  {{ review.content }}
                </p>
              </mat-list-item>
            }
          </mat-list>
        </mat-card>
      } @else {
        <p style="margin-top: 16px; padding: 16px;">Ten produkt nie ma jeszcze żadnych opinii.</p>
      }
    } @else {
      <p>Nie znaleziono produktu.</p>
    }
  `,
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
