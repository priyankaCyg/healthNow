import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnApproverComponent } from './grn-approver.component';

describe('GrnApproverComponent', () => {
  let component: GrnApproverComponent;
  let fixture: ComponentFixture<GrnApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
