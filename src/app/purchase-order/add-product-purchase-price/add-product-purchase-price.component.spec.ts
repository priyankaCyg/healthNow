import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPurchasePriceComponent } from './add-product-purchase-price.component';

describe('AddProductPurchasePriceComponent', () => {
  let component: AddProductPurchasePriceComponent;
  let fixture: ComponentFixture<AddProductPurchasePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductPurchasePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductPurchasePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
