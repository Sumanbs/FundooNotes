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
import { NotesArray } from "../core/model/notes";
import { LabelArray } from "./../core/model/notes";
import { CollaboratorArray } from "../core/model/notes";
@Component({
    selector: "app-archivenote",
    templateUrl: "./archivenote.component.html",
    styleUrls: ["./archivenote.component.css"]
})
export class ArchivenoteComponent implements OnInit, OnDestroy {
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

    newcard: boolean;
    loading: boolean = true;
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
    all_notes: NotesArray[] = [];
    allCollaborators: CollaboratorArray[] = [];
    allLabels: LabelArray[] = [];
    /**
     * All the dependencies are declared in the constructor
     */
    constructor(
        private cookie: CookieService,
        private notesservice: NotesService,
        private commonService: CommonService,
        private router: Router,
        public dialog: MatDialog,
        public archive: ArchiveService
    ) {
        this.subscription = this.commonService.getData().subscribe(message => {
            this.message = message;
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
        let obs = this.archive.getArchivedNotes(email);
        obs.subscribe(
            (status: any) => {
                this.all_notes = status;
                obs.unsubscribe();
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
     * @description - This function selects reminder date and time from reminder menu.
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
        if (cardselection == "main") {
            this.reminderSet = true;
        }

        let dateFormat = require("dateformat");
        let now = new Date();
        this.reminder_date = dateFormat(now, "dd/mm/yyyy");
        this.reminder_time = "08:00 pm";
    }
    /**
     * @method select8pm()
     * @param any
     * @description-This method selects the reminder date and time if user
     * selects 8am.
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
     * @description - This method selects the reminder date and time if user
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
        let dateFormat = require("dateformat");
        if (this.reminder_date != null && this.reminder_time != null)
            this.reminder_date = dateFormat(this.reminder_date, "dd/mm/yyyy");

        let remainderDateTime = this.reminder_date + " " + this.reminder_time;

        let obs = this.notesservice.updateReminder(id, remainderDateTime);
        obs.subscribe((status: any) => {
            if (status.status == 200) {
                this.all_notes.forEach(element => {
                    if (element.id == id) {
                        this.all_notes["remainderDateTime"] = remainderDateTime;
                        element.remainderDateTime = remainderDateTime;
                        this.enableDateTimeMenu = false;
                        this.reminder_date = null;
                        this.reminder_time = null;
                    }
                });
            }
            obs.unsubscribe();
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
                            this.all_notes["remainderDateTime"] = "null null";
                            element.remainderDateTime = "null null";
                            this.enableDateTimeMenu = false;
                            this.reminder_date = null;
                            this.reminder_time = null;
                        }
                    });
                }
                obs.unsubscribe();
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
    }
    changeColor(id, color) {
        let obs = this.notesservice.changeColor(id, color);
        obs.subscribe((status: any) => {
            if (status.status == 200) {
                this.all_notes.forEach(element => {
                    if (element.id == id) {
                        this.all_notes["color"] = color;
                        element.color = color;
                    }
                });
            }
            obs.unsubscribe();
        });
    }
    openDialog(item): void {
        var dialogRef = this.dialog.open(EditnotesComponent, {
            width: "550px",
            height: "30%",
            data: { item }
        });
        dialogRef.afterClosed().subscribe(result => {});
    }
    /**
     * @method deleteNote()
     * @param id
     * @description - This method is used delete the note from notes array
     */
    deleteNote(id) {
        let email = this.cookie.get("key");
        let obs = this.notesservice.deleteNote(id, email);
        obs.subscribe(
            (status: any) => {
                this.all_notes = status;
                obs.unsubscribe();
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
    }
    /**
     * @method unarchiveNote()
     * @param id
     * @description - This method
     */
    unarchiveNote(id) {
        let email = this.cookie.get("key");
        let obs = this.archive.unarchiveNote(email, id);
        obs.subscribe(
            (status: any) => {
                this.all_notes = status;
                obs.unsubscribe();
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
    }
}
