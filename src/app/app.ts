import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { Cart } from './cart/cart';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatToolbar,
    MatIcon,
    Cart,
  ],
  styleUrl: './app.scss',
  template: /*html*/ `
    <div class="main-wrapper">
      <mat-card class="main-card">
        <mat-card-header>
          <mat-card-title>Sklep</mat-card-title>
        </mat-card-header>

        <mat-toolbar color="primary">
          <a
            mat-button
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <mat-icon>home</mat-icon>
            Strona główna
          </a>

          <a mat-button routerLink="/products" routerLinkActive="active">
            <mat-icon>shopping_bag</mat-icon>
            Produkty
          </a>

          <div class="cart-menu">
            <a mat-button routerLink="/cart" routerLinkActive="active">
              <mat-icon>shopping_cart</mat-icon>
              Koszyk
              <mat-icon>keyboard_arrow_down</mat-icon>
            </a>

            <div class="cart-preview">
              <app-cart></app-cart>
            </div>
          </div>
        </mat-toolbar>

        <mat-card-content>
          <router-outlet></router-outlet>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class App {}
