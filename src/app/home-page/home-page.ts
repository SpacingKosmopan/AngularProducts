import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-home-page',
  styleUrl: './home-page.scss',
  template: `<p>
    Witam ciebie na stronie głównej. Możesz teraz przejść sobie do zakładki produktów, aby coś
    wybrać, albo do koszyka, aby sfinalizować zamówienie.
  </p>`,
})
export class HomePage {}
