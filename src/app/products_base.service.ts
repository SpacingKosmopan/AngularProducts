import { Service } from '@angular/core';

export interface Order {
  customer: string;
  adress: string;
  phone: string;
  email: string;
  date: string;
  cart: { data: Product; amount: number }[];
  paymentMetod: PaymentMethod;
}

export interface CartProduct {
  idInCart: number;
  data: Product;
  amount: number;
}

export enum PaymentMethod {
  BLIK = 'blik',
  BANK_ACCOUNT = 'bank_account',
  ON_DELIVERY = 'on_delivery', // default
}

export enum PaymentMethodPolish {
  BLIK = 'Płatność BLIK',
  BANK_ACCOUNT = 'Płatność kartą',
  ON_DELIVERY = 'Płatność za pobraniem',
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

  cart: CartProduct[] = [];

  getCart(): CartProduct[] {
    return this.cart;
  }

  nextId = this.cart.length;

  addProduct(product: Product) {
    // array items are objects => find() returs mutable reference
    let firstFind = this.cart.find((item) => item.data.id === product.id);
    if (firstFind === undefined) {
      this.cart = [...this.cart, { data: product, idInCart: this.nextId, amount: 1 }];
    } else firstFind.amount += 1;

    this.nextId++;
  }

  removeProduct(productTRMV: number) {
    // array items are objects => find() returs mutable reference
    let firstFind = this.cart.find((item) => item.data.id === productTRMV);
    if (firstFind === undefined) return;
    else {
      if (firstFind.amount === 1) {
        const answer = window.confirm('Czy na pewno chcesz usunąć dany produkt z koszyka?');
        if (!answer) return;
      }
      firstFind.amount -= 1;
    }

    if (firstFind.amount === 0)
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
    this.cart = [];
    return this.nextOrderId - 1;
  }

  getOrder(id: number) {
    console.log({ order: this.placedOrders[id] });
    return this.placedOrders[id];
  }
}
