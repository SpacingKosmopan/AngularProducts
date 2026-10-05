import { Component } from '@angular/core';
import { ProductList } from './product-list/product-list';
import { Cart } from './cart/cart';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    ProductList,
    Cart,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    RouterLink,
    RouterOutlet,
  ],
  styleUrl: './app.scss',
  template: /*html*/ `
    <div class="main-wrapper">
      <nav><a routerLink="/">Strona główna</a> | <a routerLink="/cart">Koszyk</a></nav>

      <router-outlet></router-outlet>

      <mat-card class="main-card">
        <mat-card-header>
          <mat-card-title>Sklep</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="section-container">
            <app-product-list
              [products]="products"
              (addProductEvent)="addProduct($event)"
              (removeProductEvent)="removeProduct($event)"
            />
          </div>

          <mat-divider class="my-4"></mat-divider>

          <div class="section-container">
            <app-cart
              [cart]="cart"
              (removeProductEvent)="removeProduct($event)"
              [products]="products"
            />
          </div>
        </mat-card-content>

        <mat-card-actions class="actions-container">
          <button mat-raised-button color="primary">Action</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class App {
  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 },
  ];

  cart = new Array();

  nextId = this.cart.length;

  addProduct(product: Product) {
    console.log('App is adding the product');
    this.cart = [...this.cart, { data: product, idInCart: this.nextId }];
    this.nextId++;
  }

  removeProduct(productTRMV: number) {
    let firstFind = this.cart.find((item) => item.data.id === productTRMV);
    this.cart = this.cart.filter((item) => item.idInCart !== firstFind.idInCart);
  }
}
