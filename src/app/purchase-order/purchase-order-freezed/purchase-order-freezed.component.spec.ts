import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderFreezedComponent } from './purchase-order-freezed.component';

describe('PurchaseOrderFreezedComponent', () => {
  let component: PurchaseOrderFreezedComponent;
  let fixture: ComponentFixture<PurchaseOrderFreezedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderFreezedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderFreezedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
