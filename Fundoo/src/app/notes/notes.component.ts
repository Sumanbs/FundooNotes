declare let require: any;
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotesService } from "../Services/notes.service";
import { CookieService } from "angular2-cookie";
import { CommonService } from "../Services/list-grid.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { EditnotesComponent } from "../editnotes/editnotes.component";
import { ArchiveService } from "../Services/archive.service";
import { CreatelabelsService } from "../Services/createlabels.service";
import { LabelsService } from "../Services/labels.service";
import { CollaboratorComponent } from "../collaborator/collaborator.component";
import { UpdatecollaboratorComponent } from "../updatecollaborator/updatecollaborator.component";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { DragDropService } from "../Services/drag-drop.service";
@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"]
})
export class NotesComponent implements OnInit, OnDestroy {
  /**
   * Variable for all notes data
   */
  allLabels: any;
  /**
   * variable for reminder date and time
   */
  reminder_date: any;
  reminder_time: any;
  reminder = false;
  enable = false;
  /**
   * To expand the cards
   */
  enable_other_cards = false;
  mail: any;
  email: string;
  /**
   * Display HTTP error messages
   * @var boolean
   * @var any
   * @var any
   */
  iserror: boolean;
  errorMessage: any;
  errorstack: any;
  all_notes;
  title: any;
  note: any;
  color: any;
  date = new Date();
  reminderSet: boolean = false;
  message: any;
  archived: any = false;
  subscription: Subscription;
  /**
   * To enable time mat menu options
   * @var boolean
   * @var booleam
   * @var booleam
   */
  enable8: boolean = true;
  enable13: boolean = true;
  enable20: boolean = true;
  id1: any;
  enableDateTimeMenu: boolean = true;
  selectedLabels: any;
  selectedCollaborators: any;
  allCollaborators: any;
  searchSubscription: Subscription;
  searchItem: any;
  /**
   * All the dependencies are declared in the constructor
   */
  constructor(
    private cookie: CookieService,
    private notesservice: NotesService,
    private commonService: CommonService,
    private router: Router,
    public dialog: MatDialog,
    public archive: ArchiveService,
    public createlabels: CreatelabelsService,
    public labelsservice: LabelsService,
    public DragAndDrop: DragDropService
  ) {
    this.subscription = this.commonService.getData().subscribe(message => {
      this.message = message;
    });

    this.searchSubscription = this.commonService
      .getsearchItem()
      .subscribe(message => {
        this.searchItem = message;
      });
    /**
     * @method setInterval()
     * This function calls date function for every 40 seconds to check the reminder
     */
    setInterval(() => {
      this.datefunction();
    }, 4000);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  model: any = {};
  public Observable;
  /**
   * @method ngOnInit()
   * Executed when the page gets reloaded
   * @var any
   */
  ngOnInit() {
    /**
     * Get email from cookie
     */
    let email = this.cookie.get("key");
    /**
     * Get all notes from backend
     */
    let obs = this.notesservice.get_all_notes(email);
    obs.subscribe(
      (status: any) => {
        this.all_notes = status.allNotes;
        this.allCollaborators = status.allCollaborators;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
    /**
     * get all labels assigned to particular note data from backend
     */
    let obs1 = this.createlabels.get_all_labels(email);
    obs1.subscribe(
      (status: any) => {
        this.allLabels = status;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );

    /**
     * Get all the labelled notes details from backend
     */
    let obs2 = this.labelsservice.setedLabels(email);
    obs2.subscribe(
      (status: any) => {
        this.selectedLabels = status;
        console.log(this.selectedLabels);
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
  /**
   * Assign color to note
   */
  selectColor(colour) {
    this.color = colour;
  }
  /**
   * @method onClose()
   * This function is used send all notes data to backend.
   */
  onClose() {
    this.enable = false;
    this.email = this.cookie.get("key");
    if (this.model.title != null || this.model.note != null) {
      let dateFormat = require("dateformat");
      if (this.reminder_date != null && this.reminder_time != null) {
        if (this.reminder_date.length != 10)
          this.reminder_date = dateFormat(this.reminder_date, "dd/mm/yyyy");
      }

      let remainderDateTime = this.reminder_date + " " + this.reminder_time;
      /**
       * send notes data to backend
       */
      let obs = this.notesservice.sendnotes(
        this.model,
        this.email,
        remainderDateTime,
        this.color,
        this.archived,
        this.selectedCollaborators
      );
      /**
       * Rescives all notes ,collaborator information.
       */
      obs.subscribe(
        (status: any) => {
          if (status.status == 404) {
            alert("Not autorized user");
            localStorage.removeItem("token");
            this.router.navigate(["/login"]);
          } else {
            this.all_notes = status.allNotes;
            this.allCollaborators = status.allCollaborators;
          }
        },
        error => {
          this.iserror = true;
          this.errorMessage = error.message;
        }
      );

      /**
       * Make null all variables after sending to backend
       */
      this.model.title = null;
      this.model.note = null;
      this.selectedCollaborators = null;
      this.reminder_date = null;
      this.reminder_time = null;
      this.reminderSet = false;
    }
    this.selectedCollaborators = null;
    this.color = null;
  }
  /**
   * To save reminders
   */
  reminderSave() {
    this.reminder = false;
    this.reminderSet = true;
  }
  closeRemainderCard() {
    this.reminder = false;
    this.reminder_date = null;
    this.reminder_time = null;
    this.reminderSet = false;
  }
  /**
   * @method datefunction()
   * This function selects reminder date and time from reminder menu.
   */
  datefunction() {
    let dateFormat = require("dateformat");

    this.all_notes.forEach(element => {
      let now = new Date();

      let hour = dateFormat(now, "HH");

      if (hour < 8) {
        this.enable8 = false;
      }
      if (hour < 13) {
        this.enable13 = false;
      }
      if (hour < 20) {
        this.enable20 = false;
      }
      let currentDate = dateFormat(now, "dd/mm/yyyy");
      let currentTime = dateFormat(now, "hh:MM tt");
      let currentDateTime = currentDate + " " + currentTime;
      if (currentDateTime == element.remainderDateTime) {
        alert("Note =" + element.Note);
      }
    });
  }
  /**
   * @method select8pm()
   * @param any
   * @description - This method selects the reminder date and time if user
   * selects 8am.
   */
  select8pm(cardselection) {
    debugger;
    if (cardselection == "main") {
      this.reminderSet = true;
    }
    let dateFormat = require("dateformat");
    let now = new Date();
    this.reminder_date = dateFormat(now, "dd/mm/yyyy");
    this.reminder_time = "08:00 pm";
  }
  /**
   * @method select8am()
   * @param any
   * @description - This method selects the reminder date and time if user
   * selects 8pm.
   */
  select8am(cardselection) {
    if (cardselection == "main") {
      this.reminderSet = true;
    }
    let dateFormat = require("dateformat");
    let now = new Date();
    this.reminder_date = dateFormat(now, "dd/mm/yyyy");
    this.reminder_time = "08:00 am";
  }
  /**
   * @method select1pm()
   * @param any
   * @description -This method selects the reminder date and time if user
   * selects 1pm.
   */
  select1pm(cardselection) {
    if (cardselection == "main") {
      this.reminderSet = true;
    }
    let dateFormat = require("dateformat");
    let now = new Date();
    this.reminder_date = dateFormat(now, "dd/mm/yyyy");
    this.reminder_time = "01:00 pm";
  }
  /**
   * @method othercardReminder
   * @param integer
   * @description -Select date and time matcard for the selected note
   */
  othercardReminder(id) {
    this.all_notes.forEach(element => {
      if (element.id == id) {
        this.enableDateTimeMenu = true;
        this.id1 = id;
      }
    });
  }
  /**
   * @method reminderSaveOtherCards
   * @param integer
   * @description - this method takes the date and time from the user and saves on the variable.
   * It formats the selected date and saves it.
   */
  reminderSaveOtherCards(id) {
    /**
     * Get the dateformat
     */
    let dateFormat = require("dateformat");
    if (this.reminder_date != null && this.reminder_time != null) {
      if (this.reminder_date.length != 10)
        this.reminder_date = dateFormat(this.reminder_date, "dd/mm/yyyy");
    }
    /**
     * Concatinate date and time.
     */
    let remainderDateTime = this.reminder_date + " " + this.reminder_time;
    /**
     * Update the reminder in the database by sending it to the backend.
     * It receives all_notes data as response.
     */
    let obs = this.notesservice.updateReminder(id, remainderDateTime);
    obs.subscribe((status: any) => {
      if (status.status == 200) {
        this.all_notes.forEach(element => {
          if (element.id == id) {
            this.all_notes.remainderDateTime = remainderDateTime;
            element.remainderDateTime = remainderDateTime;
            this.enableDateTimeMenu = false;
            this.reminder_date = null;
            this.reminder_time = null;
          }
        });
      }
    });
  }
  /**
   * @method deleteReminder
   * @param integer
   * @description -This method is used to delete reminder of the particular note.
   */
  deleteReminder(id) {
    let obs = this.notesservice.deleteReminder(id);
    obs.subscribe(
      (status: any) => {
        if (status.status == 200) {
          this.all_notes.forEach(element => {
            if (element.id == id) {
              this.all_notes.remainderDateTime = "null null";
              element.remainderDateTime = "null null";
              this.enableDateTimeMenu = false;
              this.reminder_date = null;
              this.reminder_time = null;
            }
          });
        }
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
  /**
   * @method changeColor
   * @param integer
   * @param color
   * @description -This method update the notes color of the selected note
   */
  changeColor(id, color) {
    let obs = this.notesservice.changeColor(id, color);
    obs.subscribe((status: any) => {
      if (status.status == 200) {
        this.all_notes.forEach(element => {
          if (element.id == id) {
            this.all_notes.color = color;
            element.color = color;
          }
        });
      }
    });
  }
  /**
   * @method openDialog
   * @param any
   * @description -This function opens adialog component to edit the notes.
   */
  openDialog(item): void {
    var dialogRef = this.dialog.open(EditnotesComponent, {
      width: "550px",
      height: "30%",
      data: { item }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  /**
   * @method openCollaborator
   * This method open a dialog component to add collaborator to the note
   */
  openCollaborator() {
    var dialogRef = this.dialog.open(CollaboratorComponent, {
      width: "400px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedCollaborators = result;
    });
  }
  /**
   * @method updateCollaborator
   * @param integer
   * @description -This method helps to add or edit the collaborator
   * Takes note id as parameter
   */
  updateCollaborator(id) {
    var dialogRef = this.dialog.open(UpdatecollaboratorComponent, {
      width: "400px",
      data: { id }
    });
    /**
     * It receives the data from the collaborator component after gets closed.
     * It receives all notes data from backend
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != undefined) this.allCollaborators = result;
      let email = this.cookie.get("key");
      let obs = this.notesservice.get_all_notes(email);
      obs.subscribe(
        (status: any) => {
          this.all_notes = status.allNotes;
          this.allCollaborators = status.allCollaborators;
        },
        error => {
          this.iserror = true;
          this.errorMessage = error.message;
        }
      );
    });
  }
  /**
   * @method deleteNote
   * @param id integer
   * @description -This mehod deletes the notes  and receives all notes data as response.
   */
  deleteNote(id) {
    let email = this.cookie.get("key");
    let obs = this.notesservice.deleteNote(id, email);
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
   * @method archiveNote
   * @param id integer
   * @description -This method archive the note note based on selected id.
   */
  archiveNote(id) {
    let email = this.cookie.get("key");
    let obs = this.archive.archiveNote(email, id);
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
   * @method setLabel
   * @param label any
   * @param id integer
   * @description -This method is used to add label to the particular note based on id.
   */
  setLabel(label, id) {
    let email = this.cookie.get("key");
    let obs = this.labelsservice.setLabel(email, id, label);
    obs.subscribe(
      (status: any) => {
        this.selectedLabels = status;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
  /**
   *@method assignLabel
   *@var nid integer
   *@var lid integer
   *@description -This method assigns label to particular noteif the ids are equal.
   */
  assignLabel(nid, lid) {
    if (nid == lid) {
      return true;
    } else return false;
  }
  /**
   * @method deleteLabel
   * @param integer
   * @description -This method delete the label based on the selected id.
   */
  deleteLabel(Labelid) {
    let email = this.cookie.get("key");
    let obs = this.labelsservice.deleteLabel(email, Labelid);
    obs.subscribe(
      (status: any) => {
        this.selectedLabels = status;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
  /**
   * @method drop
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.all_notes, event.previousIndex, event.currentIndex);
    let diff: any;
    let direction: any;

    if (event.currentIndex > event.previousIndex) {
      direction = "upward";
      diff = event.currentIndex - event.previousIndex;
    } else {
      diff = event.previousIndex - event.currentIndex;
      direction = "downward";
    }

    let email = this.cookie.get("key");
    debugger;
    let obs = this.notesservice.dragnotes(
      email,
      this.all_notes[event.currentIndex].DragAndDropID,
      diff,
      direction
    );
    obs.subscribe(
      (notes: any) => {
        // this.all_notes = notes;
        debugger;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
}
