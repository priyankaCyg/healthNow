import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurchasePriceComponent } from './product-purchase-price.component';

describe('ProductPurchasePriceComponent', () => {
  let component: ProductPurchasePriceComponent;
  let fixture: ComponentFixture<ProductPurchasePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPurchasePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPurchasePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
