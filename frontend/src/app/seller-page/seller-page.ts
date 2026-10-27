import { Component, AfterViewInit, signal, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ProductService } from '../products.service';
import { ProductItem } from './product-item/product-item';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatListModule, MatTableModule, MatIcon],
  selector: 'app-seller-page',
  styleUrl: './seller-page.scss',
  templateUrl: './seller-page.html',
})
export class SellerPage implements AfterViewInit {
  message = signal('Zaloguj się');
  view = signal('products');
  productsService = inject(ProductService);

  products: Product[] = [];

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'imageSrc', 'actions'];

  ngAfterViewInit() {
    setTimeout(() => {
      this.message.set('A dobra, nemusíš');
    }, 5000);

    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products);
      },
      error: (err) => console.error(err),
    });
  }
}
