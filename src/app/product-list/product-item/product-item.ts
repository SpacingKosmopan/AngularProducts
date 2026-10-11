import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RedZoomDirective } from '@insightfulio/ngx-red-zoom';

@Component({
  imports: [MatButtonModule, MatIconModule, RouterLink, RedZoomDirective],
  selector: 'app-product-item',
  styleUrl: './product-item.scss',
  templateUrl: './product-item.html',
})
export class ProductItem {
  readonly product = input.required<Product>();
  readonly isInCart = input<boolean>();

  readonly addProductEvent = output<Product>();

  addProduct() {
    this.addProductEvent.emit(this.product());
  }
}
