import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentPage } from './payment-page';
import { ProductService } from '../products.service';
import { PaymentMethod, Order } from '../products.service';

describe('PaymentPage', () => {
  let component: PaymentPage;
  let fixture: ComponentFixture<PaymentPage>;

  const mockOrder: Order = {
    customer: 'Test',
    adress: 'Test St.',
    phone: '123',
    email: 'test@test.com',
    date: '2025-01-01',
    cart: [],
    paymentMetod: PaymentMethod.ON_DELIVERY,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: { get: () => '1' } },
          },
        },
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
        {
          provide: ProductService,
          useValue: { getOrder: () => mockOrder },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
