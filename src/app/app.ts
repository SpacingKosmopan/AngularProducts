import { Component } from '@angular/core';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [ProductList],
  template: `<app-product-list [products]="products" />`,
})
export class App {
  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 },
  ];
}
