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
  templateUrl: 'app.html',
})
export class App {}
