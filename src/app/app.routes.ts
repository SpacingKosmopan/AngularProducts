import { Routes } from '@angular/router';

import { Cart } from './cart/cart';
import { ProductList } from './product-list/product-list';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
  { path: '', title: 'Strona główna', component: HomePage },
  {
    path: 'products',
    title: 'Produkty',
    component: ProductList,
  },
  {
    path: 'cart',
    title: 'Koszyk',
    component: Cart,
  },
];
