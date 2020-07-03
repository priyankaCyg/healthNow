import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnFreezedComponent } from './grn-freezed.component';

describe('GrnFreezedComponent', () => {
  let component: GrnFreezedComponent;
  let fixture: ComponentFixture<GrnFreezedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnFreezedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnFreezedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
