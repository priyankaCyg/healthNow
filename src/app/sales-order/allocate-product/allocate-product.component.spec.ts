import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateProductComponent } from './allocate-product.component';

describe('AllocateProductComponent', () => {
  let component: AllocateProductComponent;
  let fixture: ComponentFixture<AllocateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
