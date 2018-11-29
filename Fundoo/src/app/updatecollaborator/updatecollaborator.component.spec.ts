import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecollaboratorComponent } from './updatecollaborator.component';

describe('UpdatecollaboratorComponent', () => {
  let component: UpdatecollaboratorComponent;
  let fixture: ComponentFixture<UpdatecollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
