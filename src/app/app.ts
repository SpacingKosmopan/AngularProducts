import { Component } from '@angular/core';
import { ProductList } from './product-list/product-list';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  imports: [ProductList, Cart],
  template: `<app-product-list
      [products]="products"
      (addProductEvent)="addProduct($event)"
      (removeProductEvent)="removeProduct($event)"
    />
    <hr />
    <app-cart [cart]="cart" (removeProductEvent)="removeProduct($event)" />`,
})
export class App {
  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 },
  ];

  cart = new Array();

  addProduct(product: Product) {
    console.log('App is adding the product');
    this.cart = [...this.cart, { data: product, idInCart: this.cart.length }];
    console.log({ cart: this.cart });
  }

  removeProduct(productTRMV: number) {
    this.cart = this.cart.filter((product) => product.idInCart !== productTRMV);
  }
}
