import { Component, inject, computed, signal, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentMethod, ProductService } from '../products_base.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
  ],
  selector: 'app-paying-page',
  styleUrl: './paying-page.scss',
  templateUrl: './paying-page.html',
})
export class PayingPage implements AfterViewInit {
  productsService = inject(ProductService);

  paymentProcess = signal(false);

  snackBar = inject(MatSnackBar);

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

    // payment type change
    this.paymentForm.get('payment')?.valueChanges.subscribe((value) => {
      this.paymentForm.controls.blikCode.reset();
      this.paymentForm.controls.bankAccountNumber.reset();
    });
  }

  router = inject(Router);

  paymentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    payment: new FormControl(PaymentMethod.ON_DELIVERY, Validators.required),
    blikCode: new FormControl('', Validators.pattern(/^\d{6}$/)),
    bankAccountNumber: new FormControl('', Validators.pattern(/^\d{26}$/)),
  });

  loadingTimeRange = { min: 3000, max: 10000 };
  errorRange = { min: 0, max: 100 };
  errorChancePercent = 10;

  handleSubmit() {
    console.log(this.paymentForm.value);

    const randomLoadingTime = Math.floor(
      Math.random() * (this.loadingTimeRange.max - this.loadingTimeRange.min + 1) +
        this.loadingTimeRange.min,
    );
    //console.log(randomLoadingTime);

    const randomErrorChance = Math.floor(
      Math.random() * (this.errorRange.max - this.errorRange.min + 1) + this.errorRange.min,
    );
    //console.log(randomErrorChance);

    // blik code
    if (
      (this.paymentForm.value.payment === 'blik' &&
        this.paymentForm.get('blikCode')?.hasError('pattern')) ||
      (this.paymentForm.value.payment === 'blik' && this.paymentForm.value.blikCode === '')
    ) {
      this.snackBar.open('Niepoprawny kod BLIK', '', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });

      return;
    }

    // account number
    if (
      this.paymentForm.value.payment === 'bank_account' &&
      this.paymentForm.value.bankAccountNumber?.length !== 26
    ) {
      this.snackBar.open('Niepoprawny numer konta bankowego', '', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });

      return;
    }

    this.paymentProcess.set(true);

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
          paymentMetod: this.paymentForm.value.payment || PaymentMethod.ON_DELIVERY,
        });

        this.router.navigate([`/payment`], { queryParams: { 'order-id': orderId } });
      }
    }, randomLoadingTime);
  }
}
