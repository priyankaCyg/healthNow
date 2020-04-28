import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupCategoryComponent } from './add-sup-category.component';

describe('AddSupCategoryComponent', () => {
  let component: AddSupCategoryComponent;
  let fixture: ComponentFixture<AddSupCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
