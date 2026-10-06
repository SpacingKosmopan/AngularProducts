import { Service } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

export interface Order {
  customer: string;
  adress: string;
  phone: string;
  email: string;
  date: string;
  cart: Product[];
}

@Service()
export class ProductService {
  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  cart: { idInCart: number; data: Product }[] = [];

  getCart(): { idInCart: number; data: Product }[] {
    return this.cart;
  }

  nextId = this.cart.length;

  addProduct(product: Product) {
    console.log('App is adding the product');
    this.cart = [...this.cart, { data: product, idInCart: this.nextId }];
    this.nextId++;
  }

  removeProduct(productTRMV: number) {
    let firstFind = this.cart.find((item) => item.data.id === productTRMV);
    if (firstFind === undefined) return;
    this.cart = this.cart.filter((item) => item.idInCart !== firstFind.idInCart);
  }

  placedOrders: { id: number; data: Order }[] = [];

  nextOrderId = 0;

  getOrders() {
    return this.placedOrders;
  }

  placeOrder(data: Order) {
    this.placedOrders.push({ id: this.nextOrderId, data: data });
    this.nextOrderId++;
    console.log($`data`);
  }
}
