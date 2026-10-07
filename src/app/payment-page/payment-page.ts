import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../products_base.service';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatListModule, RouterLink, MatButtonModule, MatIconModule],
  selector: 'app-payment-page',
  styleUrl: './payment-page.scss',
  template: `<p>Zakup został sfinalizowany <mat-icon>check</mat-icon></p>
    <h3>Podsumowanie tranzakcji {{ orderId }}</h3>
    @let order = this.productsService.getOrder(orderId);
    <p>{{ order.customer }}, {{ order.adress }}</p>
    <mat-list>
      @for (product of order.cart; track product.data.id) {
        <mat-list-item
          >{{ product.data.name }} {{ product.amount }}x -
          {{ product.data.price * product.amount }}zł</mat-list-item
        >
      }
    </mat-list>

    <p>Przewidywana dostawa: <b>1.4 mld lat</b></p>
    <a mat-raised-button routerLink="/products">Powrót</a>`,
})
export class PaymentPage {
  route = inject(ActivatedRoute);
  productsService = inject(ProductService);

  orderIdString = this.route.snapshot.queryParamMap.get('order-id') || null;
  orderId = Number(this.orderIdString);
}
