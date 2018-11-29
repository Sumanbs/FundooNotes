declare let require: any;
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotesService } from "../Services/notes.service";
import { CookieService } from "angular2-cookie";
import { CommonService } from "../Services/list-grid.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { EditnotesComponent } from "../editnotes/editnotes.component";
import { TrashService } from "../Services/trash.service";
@Component({
  selector: "app-trash",
  templateUrl: "./trash.component.html",
  styleUrls: ["./trash.component.css"]
})
export class TrashComponent implements OnInit, OnDestroy {
  mail: any;
  email: string;
  iserror: boolean;
  errorMessage: any;
  errorstack: any;
  all_notes;
  subscription: Subscription;
  message: any;

  constructor(
    private cookie: CookieService,
    private notesservice: NotesService,
    private commonService: CommonService,
    private router: Router,
    public dialog: MatDialog,
    public trash: TrashService
  ) {
    this.subscription = this.commonService.getData().subscribe(message => {
      this.message = message;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public Observable;
  /**
   * @method ngOnInit()
   * Executed at the time of component loading
   */
  ngOnInit() {
    let email = this.cookie.get("key");
    let obs = this.trash.getDeletedNotes(email);
    obs.subscribe(
      (status: any) => {
        this.all_notes = status;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
  /**
   * @method restoreNote()
   * @param id
   * @description - This method restores the deleted note.
   * Note will be added back to the notes array.
   */
  restoreNote(id) {
    let email = this.cookie.get("key");
    let obs = this.trash.restoreNote(email, id);
    obs.subscribe(
      (status: any) => {
        this.all_notes = status;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
  /**
   * @method deletePermanently()
   * @param id
   * @description - This method deletes note from database permanently.
   */
  deletePermanently(id) {
    let email = this.cookie.get("key");
    let obs = this.trash.deletePermanently(email, id);
    obs.subscribe(
      (status: any) => {
        this.all_notes = status;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
}
