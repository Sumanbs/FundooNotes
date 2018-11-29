import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabellednotesComponent } from './labellednotes.component';

describe('LabellednotesComponent', () => {
  let component: LabellednotesComponent;
  let fixture: ComponentFixture<LabellednotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabellednotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabellednotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
