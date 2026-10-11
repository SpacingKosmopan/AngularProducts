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
  templateUrl: './payment-page.html',
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
