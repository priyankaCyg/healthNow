import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductImageComponent } from './view-product-image.component';

describe('ViewProductImageComponent', () => {
  let component: ViewProductImageComponent;
  let fixture: ComponentFixture<ViewProductImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
