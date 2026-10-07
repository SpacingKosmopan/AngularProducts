import { Component, inject, computed, signal, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../products_base.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-paying-page',
  styleUrl: './paying-page.scss',
  template: /*html*/ `<h3>Podsumowanie zamówienia</h3>
    @if (this.productsService.getCart().length === 0) {
      <p>Twój koszyk jest pusty. Najpierw coś dodaj</p>
    } @else {
      <p>
        @for (product of this.productsService.getCart(); track product.idInCart) {
          {{ product.data.name }} - {{ product.amount }}x
        }
      </p>
      <p>
        Razem: <b>{{ price() }}zł</b>
      </p>

      <form [formGroup]="paymentForm" (ngSubmit)="handleSubmit()" class="payment-form" novalidate>
        <mat-form-field class="form-input-field">
          <mat-label>Imię i nazwisko</mat-label>
          <input matInput type="text" formControlName="name" />
        </mat-form-field>
        <mat-form-field class="form-input-field">
          <mat-label>E-Mail</mat-label><input matInput type="text" formControlName="email" />
          @if (paymentForm.get('email')?.hasError('email')) {
            <mat-error>Podaj poprawny E-Mail</mat-error>
          }
        </mat-form-field>
        <mat-form-field class="form-input-field">
          <mat-label>Telefon kontaktowy</mat-label
          ><input matInput type="text" formControlName="phone" />
        </mat-form-field>
        <mat-form-field class="form-input-field">
          <mat-label>Adres wysyłki</mat-label
          ><input matInput type="text" formControlName="adress" />
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="!paymentForm.valid || paymentProcess()"
          class="final-payment-button"
        >
          @if (!paymentProcess()) {
            Zamów
          } @else {
            W toku... <mat-spinner diameter="20"></mat-spinner>
          }
        </button>
      </form>
    }`,
})
export class PayingPage implements AfterViewInit {
  productsService = inject(ProductService);

  paymentProcess = signal(false);

  private snackBar = inject(MatSnackBar);

  price = this.getNewPrice();

  getNewPrice() {
    return computed(() =>
      this.productsService.getCart().reduce((acc, product) => acc + product.data.price, 0),
    );
  }

  ngAfterViewInit() {
    if (this.productsService.getCart().length === 0) {
      this.router.navigate([`/`]);
    }

    this.snackBar.open('Aby zfinalizować zakup, uzupełnij informacje', 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  router = inject(Router);

  paymentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
  });

  loadingTimeRange = { min: 3000, max: 10000 };
  errorRange = { min: 0, max: 100 };
  errorChancePercent = 10;

  handleSubmit() {
    this.paymentProcess.set(true);

    const randomLoadingTime = Math.floor(
      Math.random() * (this.loadingTimeRange.max - this.loadingTimeRange.min + 1) +
        this.loadingTimeRange.min,
    );
    //console.log(randomLoadingTime);

    const randomErrorChance = Math.floor(
      Math.random() * (this.errorRange.max - this.errorRange.min + 1) + this.errorRange.min,
    );
    //console.log(randomErrorChance);

    setTimeout(() => {
      this.paymentProcess.set(false);

      if (randomErrorChance < this.errorChancePercent) {
        this.snackBar.open('Wystąpił błąd', '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      } else {
        const orderId = this.productsService.placeOrder({
          customer: this.paymentForm.value.name || '',
          adress: this.paymentForm.value.adress || '',
          phone: this.paymentForm.value.phone || '',
          email: this.paymentForm.value.email || '',
          date: new Date().toISOString(),
          cart:
            this.productsService.getCart().map(({ data, amount }) => ({
              data,
              amount,
            })) || [],
        });

        this.router.navigate([`/payment`], { queryParams: { 'order-id': orderId } });
      }
    }, randomLoadingTime);
  }
}
