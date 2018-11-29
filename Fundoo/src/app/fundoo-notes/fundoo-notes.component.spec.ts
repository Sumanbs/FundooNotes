
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FundooNotesComponent } from './fundoo-notes.component';

describe('FundooNotesComponent', () => {
  let component: FundooNotesComponent;
  let fixture: ComponentFixture<FundooNotesComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [FundooNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundooNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
