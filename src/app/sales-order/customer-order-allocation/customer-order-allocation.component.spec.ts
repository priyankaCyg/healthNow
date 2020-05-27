import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderAllocationComponent } from './customer-order-allocation.component';

describe('CustomerOrderAllocationComponent', () => {
  let component: CustomerOrderAllocationComponent;
  let fixture: ComponentFixture<CustomerOrderAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
