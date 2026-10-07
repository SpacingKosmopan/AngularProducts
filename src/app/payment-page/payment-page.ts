import { Component, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products_base.service';
import { MatListModule } from '@angular/material/list';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatListModule, RouterLink, MatButtonModule, MatIconModule],
  selector: 'app-payment-page',
  styleUrl: './payment-page.scss',
  template: ` @if (order) {
      <p>Zakup został sfinalizowany <mat-icon>check</mat-icon></p>
      <h3>Podsumowanie tranzakcji</h3>

      <p>
        {{ order.data.customer }}, {{ order.data.adress }},
        {{ order.data.paymentMetod }}
      </p>
      <mat-list>
        @for (product of order.data.cart; track product.data.id) {
          <mat-list-item
            >{{ product.data.name }} {{ product.amount }}x -
            {{ product.data.price * product.amount }}zł</mat-list-item
          >
        }
      </mat-list>

      <p>Przewidywana dostawa: <b>za 1.4 mld lat</b></p>
    }
    <a mat-raised-button routerLink="/products">Powrót</a>`,
})
export class PaymentPage implements AfterViewInit {
  route = inject(ActivatedRoute);
  productsService = inject(ProductService);
  router = inject(Router);

  orderIdString = this.route.snapshot.queryParamMap.get('order-id');
  orderId = this.orderIdString ? Number(this.orderIdString) : undefined;
  order = this.orderId !== undefined ? this.productsService.getOrder(this.orderId) : undefined;

  ngAfterViewInit() {
    if (this.order === undefined) {
      this.router.navigate([`/products`]);
    }
  }
}
