import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePoDetailEditComponent } from './create-po-detail-edit.component';

describe('CreatePoDetailEditComponent', () => {
  let component: CreatePoDetailEditComponent;
  let fixture: ComponentFixture<CreatePoDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePoDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePoDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
