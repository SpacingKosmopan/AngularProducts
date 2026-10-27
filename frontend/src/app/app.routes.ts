import { Routes } from '@angular/router';

import { HomePage } from './home-page/home-page';

export const routes: Routes = [
  { path: '', title: 'Strona główna', component: HomePage },
  {
    path: 'products',
    title: 'Produkty',
    //component: ProductList,
    loadComponent: () => import('./product-list/product-list').then((c) => c.ProductList),
  },
  {
    path: 'cart',
    title: 'Koszyk',
    //component: Cart,
    loadComponent: () => import('./cart/cart').then((c) => c.Cart),
  },
  {
    path: 'paying',
    title: 'Zakupy',
    //component: PayingPage,
    loadComponent: () => import('./paying-page/paying-page').then((c) => c.PayingPage),
  },
  {
    path: 'payment',
    title: 'Podsumowanie zakupu',
    loadComponent: () => import('./payment-page/payment-page').then((c) => c.PaymentPage),
  },
  {
    path: 'product',
    title: 'Produkt',
    loadComponent: () => import('./product-page/product-page').then((c) => c.ProductPage),
  },
  {
    path: 'seller',
    title: 'Sprzedawca',
    loadComponent: () => import('./seller-page/seller-page').then((c) => c.SellerPage),
  },
];
