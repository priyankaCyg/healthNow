import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMappingComponent } from './area-mapping.component';

describe('AreaMappingComponent', () => {
  let component: AreaMappingComponent;
  let fixture: ComponentFixture<AreaMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
