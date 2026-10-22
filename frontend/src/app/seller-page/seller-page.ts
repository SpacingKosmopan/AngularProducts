import { Component, AfterViewInit, signal, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ProductService } from '../products.service';
import { ProductItem } from './product-item/product-item';

@Component({
  imports: [MatListModule, ProductItem],
  selector: 'app-seller-page',
  styleUrl: './seller-page.scss',
  templateUrl: './seller-page.html',
})
export class SellerPage implements AfterViewInit {
  message = signal('Zaloguj się');
  view = signal('products');
  productsService = inject(ProductService);

  products: Product[] = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.message.set('A dobra, nemusíš');
    }, 5000);

    this.productsService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error(err),
    });
  }
}
