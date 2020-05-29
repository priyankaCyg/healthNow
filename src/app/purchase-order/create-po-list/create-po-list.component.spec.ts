import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePoListComponent } from './create-po-list.component';

describe('CreatePoListComponent', () => {
  let component: CreatePoListComponent;
  let fixture: ComponentFixture<CreatePoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
