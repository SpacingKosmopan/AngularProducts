import { Routes } from '@angular/router';

import { Cart } from './cart/cart';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
  { path: '', title: 'Strona główna', component: HomePage },
  {
    path: 'cart',
    title: 'Koszyk',
    component: Cart,
  },
];
