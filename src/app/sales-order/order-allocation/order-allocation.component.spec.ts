import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAllocationComponent } from './order-allocation.component';

describe('OrderAllocationComponent', () => {
  let component: OrderAllocationComponent;
  let fixture: ComponentFixture<OrderAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
