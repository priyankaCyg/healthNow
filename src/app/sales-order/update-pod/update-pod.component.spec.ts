import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePodComponent } from './update-pod.component';

describe('UpdatePodComponent', () => {
  let component: UpdatePodComponent;
  let fixture: ComponentFixture<UpdatePodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
