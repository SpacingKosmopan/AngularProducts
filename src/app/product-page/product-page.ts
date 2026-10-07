import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products_base.service';

@Component({
  imports: [],
  selector: 'app-product-page',
  styleUrl: './product-page.scss',
  template: ` @if (product) {
    {{ product.name }}
  }`,
})
export class ProductPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductService);

  productIdString = this.route.snapshot.queryParamMap.get('product-id');
  productId = this.productIdString ? Number(this.productIdString) : undefined;
  product =
    this.productId !== undefined ? this.productsService.getProduct(this.productId) : undefined;
}
