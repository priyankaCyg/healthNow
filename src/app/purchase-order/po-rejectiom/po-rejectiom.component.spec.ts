import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoRejectiomComponent } from './po-rejectiom.component';

describe('PoRejectiomComponent', () => {
  let component: PoRejectiomComponent;
  let fixture: ComponentFixture<PoRejectiomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoRejectiomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoRejectiomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
