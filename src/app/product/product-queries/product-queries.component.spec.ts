import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQueriesComponent } from './product-queries.component';

describe('ProductQueriesComponent', () => {
  let component: ProductQueriesComponent;
  let fixture: ComponentFixture<ProductQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
