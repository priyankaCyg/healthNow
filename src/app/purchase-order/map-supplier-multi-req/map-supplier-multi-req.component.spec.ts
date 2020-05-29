import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSupplierMultiReqComponent } from './map-supplier-multi-req.component';

describe('MapSupplierMultiReqComponent', () => {
  let component: MapSupplierMultiReqComponent;
  let fixture: ComponentFixture<MapSupplierMultiReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSupplierMultiReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSupplierMultiReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
