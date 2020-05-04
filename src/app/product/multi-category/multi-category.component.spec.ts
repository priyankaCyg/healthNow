import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCategoryComponent } from './multi-category.component';

describe('MultiCategoryComponent', () => {
  let component: MultiCategoryComponent;
  let fixture: ComponentFixture<MultiCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
