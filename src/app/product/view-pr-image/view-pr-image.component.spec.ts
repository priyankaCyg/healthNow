import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrImageComponent } from './view-pr-image.component';

describe('ViewPrImageComponent', () => {
  let component: ViewPrImageComponent;
  let fixture: ComponentFixture<ViewPrImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
