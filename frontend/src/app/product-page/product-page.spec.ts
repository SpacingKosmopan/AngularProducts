import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPage } from './product-page';
import { provideRouter } from '@angular/router';

describe('ProductPage', () => {
  let component: ProductPage;
  let fixture: ComponentFixture<ProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
