import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatButtonModule,
    MatToolbar,
    MatIcon,
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

          <a mat-button routerLink="/cart" routerLinkActive="active">
            <mat-icon>shopping_cart</mat-icon>
            Koszyk
          </a>
        </mat-toolbar>

        <mat-card-content>
          <router-outlet></router-outlet>
        </mat-card-content>

        <mat-card-actions class="actions-container">
          <button mat-raised-button color="primary">Action</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class App {}
