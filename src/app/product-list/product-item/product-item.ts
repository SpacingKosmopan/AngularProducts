import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RedZoomDirective } from '@insightfulio/ngx-red-zoom';

@Component({
  imports: [MatButtonModule, MatIconModule, RouterLink, RedZoomDirective],
  selector: 'app-product-item',
  styleUrl: './product-item.scss',
  template: /*html*/ `
    <div class="product-row">
      <div
        class="product-info"
        routerLink="/product"
        [queryParams]="{ product_id: product().id }"
        title="Kliknij, aby przejść do strony produktu"
      >
        <img
          [src]="product().imageSrc"
          [redZoom]="product().imageSrc"
          redZoomClass="red-zoom--style--window"
          redZoomBehavior="hover"
          [alt]="product().name"
          class="product-image"
        />
        <div class="product-details">
          <span class="product-name">{{ product().name }}</span>
          <span class="product-price">{{ product().price }} zł</span>
        </div>
      </div>

      <button mat-flat-button color="primary" class="add-btn" (click)="addProduct()">
        <mat-icon>add_shopping_cart</mat-icon>Dodaj do koszyka
      </button>
    </div>
  `,
})
export class ProductItem {
  readonly product = input.required<Product>();
  readonly isInCart = input<boolean>();

  readonly addProductEvent = output<Product>();

  addProduct() {
    this.addProductEvent.emit(this.product());
  }
}
