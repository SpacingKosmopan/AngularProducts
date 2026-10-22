import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class ProductService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:8000';

  products: Product[] = [
    {
      id: 0,
      name: 'Klawiatura',
      price: 199,
      imageSrc: 'assets/images/keyboard.webp',
      description: 'Myszka++',
      reviews: [{ id: 0, value: 5, content: 'No fajna taka, klika se i wgl' }],
    },
    {
      id: 1,
      name: 'Mysz',
      price: 99,
      imageSrc: 'assets/images/mouse.webp',
      description: 'Kliku klik, tu i tam, pracuj pracuj',
      reviews: [],
    },
    {
      id: 2,
      name: 'Monitor',
      price: 899,
      imageSrc: 'assets/images/screen.webp',
      description: 'Kolorowe ruchome pudełko',
      reviews: [],
    },
    {
      id: 3,
      name: 'Słuchawki',
      price: 149,
      imageSrc: 'assets/images/headphones.webp',
      description: 'Takie fajne, dwuuszne, można nałożyć na głowę, nie wiem jak działają',
      reviews: [],
    },
  ];

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProduct(id: number): Product {
    return this.products[id];
  }

  cart = signal<CartProduct[]>([]);

  getCart(): CartProduct[] {
    return this.cart();
  }

  nextId = 0;

  addProduct(product: Product) {
    this.cart.update((cart) => {
      const existing = cart.find((item) => item.data.id === product.id);

      if (existing) {
        return cart.map((item) =>
          item.data.id === product.id ? { ...item, amount: item.amount + 1 } : item,
        );
      }

      return [
        ...cart,
        {
          data: product,
          idInCart: this.nextId++,
          amount: 1,
        },
      ];
    });
  }

  removeProduct(productId: number) {
    const existing = this.cart().find((item) => item.data.id === productId);

    if (!existing) return;

    if (
      existing.amount === 1 &&
      !window.confirm('Czy na pewno chcesz usunąć dany produkt z koszyka?')
    ) {
      return;
    }

    this.cart.update((cart) =>
      existing.amount === 1
        ? cart.filter((item) => item.data.id !== productId)
        : cart.map((item) =>
            item.data.id === productId ? { ...item, amount: item.amount - 1 } : item,
          ),
    );
  }

  placedOrders: { id: number; data: Order }[] = [];

  nextOrderId = 0;

  getOrders() {
    return this.placedOrders;
  }

  placeOrder(data: Order) {
    this.placedOrders.push({ id: this.nextOrderId, data: data });
    this.nextOrderId++;
    this.cart.set([]);
    return this.nextOrderId - 1;
  }

  getOrder(id: number) {
    console.log({ order: this.placedOrders[id] });
    return this.placedOrders[id];
  }
}
