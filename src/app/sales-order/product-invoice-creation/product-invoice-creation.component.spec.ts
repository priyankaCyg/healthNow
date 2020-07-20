import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInvoiceCreationComponent } from './product-invoice-creation.component';

describe('ProductInvoiceCreationComponent', () => {
  let component: ProductInvoiceCreationComponent;
  let fixture: ComponentFixture<ProductInvoiceCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInvoiceCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInvoiceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
