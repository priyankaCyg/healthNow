import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderAllocationComponent } from './product-order-allocation.component';

describe('ProductOrderAllocationComponent', () => {
  let component: ProductOrderAllocationComponent;
  let fixture: ComponentFixture<ProductOrderAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrderAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
