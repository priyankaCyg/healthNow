import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GenrelEditComponent } from './generalEdit.component';

describe('GenrelEditComponent', () => {
  let component: GenrelEditComponent;
  let fixture: ComponentFixture<GenrelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenrelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
