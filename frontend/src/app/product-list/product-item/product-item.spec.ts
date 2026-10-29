import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItem } from './product-item';
import { provideRouter } from '@angular/router';
import { Product } from '../../ProductType';

describe('ProductItem', () => {
  let component: ProductItem;
  let fixture: ComponentFixture<ProductItem>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99,
    imageSrc: 'test.png',
    description: 'A test product',
    reviews: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItem],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
