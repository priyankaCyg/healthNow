import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSupplierComponent } from './map-supplier.component';

describe('MapSupplierComponent', () => {
  let component: MapSupplierComponent;
  let fixture: ComponentFixture<MapSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
