import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoGeneralDetailsComponent } from './po-general-details.component';

describe('PoGeneralDetailsComponent', () => {
  let component: PoGeneralDetailsComponent;
  let fixture: ComponentFixture<PoGeneralDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoGeneralDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
