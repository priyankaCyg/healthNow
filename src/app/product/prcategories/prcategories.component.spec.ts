import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrcategoriesComponent } from './prcategories.component';

describe('PrcategoriesComponent', () => {
  let component: PrcategoriesComponent;
  let fixture: ComponentFixture<PrcategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrcategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
