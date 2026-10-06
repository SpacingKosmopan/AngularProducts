import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../products_base.service';

@Component({
  imports: [],
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
    }`,
})
export class PayingPage {
  productsService = inject(ProductService);

  private snackBar = inject(MatSnackBar);

  ngAfterViewInit() {
    this.snackBar.open('Aby zfinalizować zakup, uzupełnij informacje', 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
