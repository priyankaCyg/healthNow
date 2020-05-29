import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableQtyComponent } from './available-qty.component';

describe('AvailableQtyComponent', () => {
  let component: AvailableQtyComponent;
  let fixture: ComponentFixture<AvailableQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
