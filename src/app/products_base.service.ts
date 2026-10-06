import { Service } from '@angular/core';

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
}
