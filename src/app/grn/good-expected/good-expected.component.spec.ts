import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodExpectedComponent } from './good-expected.component';

describe('GoodExpectedComponent', () => {
  let component: GoodExpectedComponent;
  let fixture: ComponentFixture<GoodExpectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodExpectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodExpectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
