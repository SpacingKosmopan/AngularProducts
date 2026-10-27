import { Component, input } from '@angular/core';
import { Product } from '../../ProductType';

@Component({
  imports: [],
  selector: 'app-product-item',
  styleUrl: './product-item.scss',
  templateUrl: './product-item.html',
})
export class ProductItem {
  product = input.required<Product>();
}
