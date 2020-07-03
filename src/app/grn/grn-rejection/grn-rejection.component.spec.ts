import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnRejectionComponent } from './grn-rejection.component';

describe('GrnRejectionComponent', () => {
  let component: GrnRejectionComponent;
  let fixture: ComponentFixture<GrnRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnRejectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
