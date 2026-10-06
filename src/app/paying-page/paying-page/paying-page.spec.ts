import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayingPage } from './paying-page';

describe('PayingPage', () => {
  let component: PayingPage;
  let fixture: ComponentFixture<PayingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PayingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
