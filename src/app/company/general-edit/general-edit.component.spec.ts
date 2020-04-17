import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralEditComponent } from './general-edit.component';

describe('GeneralEditComponent', () => {
  let component: GeneralEditComponent;
  let fixture: ComponentFixture<GeneralEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
