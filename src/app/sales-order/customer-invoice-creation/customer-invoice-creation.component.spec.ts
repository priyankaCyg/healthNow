import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInvoiceCreationComponent } from './customer-invoice-creation.component';

describe('CustomerInvoiceCreationComponent', () => {
  let component: CustomerInvoiceCreationComponent;
  let fixture: ComponentFixture<CustomerInvoiceCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInvoiceCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInvoiceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
