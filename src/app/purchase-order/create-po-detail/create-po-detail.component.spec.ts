import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePoDetailComponent } from './create-po-detail.component';

describe('CreatePoDetailComponent', () => {
  let component: CreatePoDetailComponent;
  let fixture: ComponentFixture<CreatePoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
