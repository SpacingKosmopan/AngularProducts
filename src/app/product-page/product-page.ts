import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products_base.service';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [MatCardModule, NgOptimizedImage],
  selector: 'app-product-page',
  styleUrl: './product-page.scss',
  template: ` @if (product) {
      {{ product.name }}
      <mat-card class="main-product-card">
        <mat-card-content
          ><img [ngSrc]="product.imageSrc" alt="Product image" width="100" height="100" />
        </mat-card-content>

        <mat-card-content>
          <mat-card-header>
            <mat-card-title>{{ product.name }}</mat-card-title>
            <mat-card-subtitle>Taka se jes</mat-card-subtitle>
            <p class="product-price">{{ product.price }}zł</p>
          </mat-card-header>
        </mat-card-content>
      </mat-card>
    } @else {
      AAARGGHHHHHH NIE DZIAUAAAAA ZAŚ KTOSI ZEPSUŁ
    }`,
})
export class ProductPage implements OnInit {
  route = inject(ActivatedRoute);
  productsService = inject(ProductService);

  product = this.getCurrentProductInfo();

  ngOnInit(): void {
    this.product = this.getCurrentProductInfo();
  }

  getCurrentProductInfo() {
    let productIdString = this.route.snapshot.queryParamMap.get('product_id');
    let productId = productIdString ? Number(productIdString) : undefined;
    let product = productId !== undefined ? this.productsService.getProduct(productId) : undefined;
    return product;
  }
}
