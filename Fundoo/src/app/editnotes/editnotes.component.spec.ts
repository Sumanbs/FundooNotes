import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnotesComponent } from './editnotes.component';

describe('EditnotesComponent', () => {
  let component: EditnotesComponent;
  let fixture: ComponentFixture<EditnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
