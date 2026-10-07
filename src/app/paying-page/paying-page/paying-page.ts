import { Component, inject, computed } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../products_base.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../products_base.service';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-paying-page',
  styleUrl: './paying-page.scss',
  template: /*html*/ `<h3>Podsumowanie zamówienia</h3>
    @if (this.productsService.getCart().length === 0) {
      <p>Twój koszyk jest pusty. Najpierw coś dodaj</p>
    } @else {
      <p>
        @for (product of this.productsService.getCart(); track product.idInCart) {
          @if (this.productsService.getCart().find((item) => item.data.id === product.idInCart)) {
            @let amount =
              this.productsService.getCart().filter((item) => item.data.id === product.idInCart)
                .length;
            {{ product.data.name }} - {{ amount }}x
          }
        }
      </p>
      <p>
        Razem: <b>{{ price() }}zł</b>
      </p>

      <form [formGroup]="paymentForm" (ngSubmit)="handleSubmit()" class="payment-form">
        <mat-form-field class="form-input-field">
          <label for="name">Imię i nazwisko</label>
          <input matInput type="text" formControlName="name" required />
        </mat-form-field>
        <mat-form-field class="form-input-field">
          <label for="email">E-Mail</label
          ><input matInput type="text" formControlName="email" required />
        </mat-form-field>
        <mat-form-field class="form-input-field">
          <label for="phone">Telefon kontaktowy</label
          ><input matInput type="text" formControlName="phone" required />
        </mat-form-field>
        <mat-form-field class="form-input-field">
          <label for="adress">Adres wysyłki</label
          ><input matInput type="text" formControlName="adress" required />
        </mat-form-field>

        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="!paymentForm.valid"
          class="final-payment-button"
        >
          Zamów
        </button>
      </form>
    }`,
})
export class PayingPage {
  productsService = inject(ProductService);

  private snackBar = inject(MatSnackBar);

  price = computed(() =>
    this.productsService.getCart().reduce((acc, product) => acc + product.data.price, 0),
  );

  updatePrice() {
    this.price = computed(() =>
      this.productsService.getCart().reduce((acc, product) => acc + product.data.price, 0),
    );
  }

  ngAfterViewInit() {
    this.snackBar.open('Aby zfinalizować zakup, uzupełnij informacje', 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  paymentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
  });

  handleSubmit() {

    this.productsService.placeOrder({
      customer: this.paymentForm.value.name || '',
      adress: this.paymentForm.value.adress || '',
      phone: this.paymentForm.value.phone || '',
      email: this.paymentForm.value.email || '',
      date: new Date().toISOString(),
      cart: this.productsService.getCart().map(({ idInCart, data }) => data),
    });
  }
}
