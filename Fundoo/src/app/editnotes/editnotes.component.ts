declare let require: any;
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, Inject } from "@angular/core";
import { NotesService } from "../Services/notes.service";

@Component({
    selector: "app-editnotes",
    templateUrl: "./editnotes.component.html",
    styleUrls: ["./editnotes.component.css"]
})
export class EditnotesComponent {
    /**
     * @reminder_date to save the reminder date
     */
    reminder_date: any;
    /**
     * @reminder_time to save the reminder time
     */
    reminder_time: string;
    /**
     * @selectDateTimeMatcardEnable to enable date time matcard
     */
    selectDateTimeMatcardEnable: boolean = false;
    selectDateTime: boolean = true;
    /**
     * @enable8 to enable mat menu button
     */
    enable8: boolean = true;
    /**
     * @enable13 to enable mat menu button
     */
    enable13: boolean = true;
    /**
     * @enable20 to enable mat menu button
     */
    enable20: boolean = true;
    /**
     * @all_Notes - array of notes data
     */
    all_Notes: any;
    /**
     * @iserror - To check for any HTTP error
     */
    iserror: boolean;
    /**
     * @errorMessage -To display any HTTP error message
     */
    errorMessage: any;

    constructor(
        public dialogRef: MatDialogRef<EditnotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public notesservice: NotesService
    ) {
        setInterval(() => {
            this.updateTimeSelection();
        }, 1);
    }
    ngOnInit() {}

    changeColor(colors) {
        this.data.item.color = colors;
    }
    /**
     * @method updateTimeSelection
     * This method enable or disables mat menu options.
     */
    updateTimeSelection() {
        let dateFormat = require("dateformat");
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
    }

    /**
     * @method select8pm
     * This method selects 8PM and assigns it to the remainderDateTime
     */
    select8pm() {
        let dateFormat = require("dateformat");
        let now = new Date();
        this.reminder_date = dateFormat(now, "dd/mm/yyyy");
        this.reminder_time = "08:00 pm";
        this.data.item.remainderDateTime =
            this.reminder_date + " " + this.reminder_time;
    }
    /**
     * @method select8am
     * This method selects 8PM and assigns it to the remainderDateTime
     */
    select8am() {
        let dateFormat = require("dateformat");
        let now = new Date();
        this.reminder_date = dateFormat(now, "dd/mm/yyyy");
        this.reminder_time = "08:00 am";
        this.data.item.remainderDateTime =
            this.reminder_date + " " + this.reminder_time;
    }
    /**
     * @method select1pm
     * This method selects 8PM and assigns it to the remainderDateTime
     */
    select1pm() {
        let dateFormat = require("dateformat");
        let now = new Date();
        this.reminder_date = dateFormat(now, "dd/mm/yyyy");
        this.reminder_time = "01:00 pm";
    }
    /**
     * @method saveReminder
     * This method saves the the reminder
     */
    saveReminder() {
        let dateFormat = require("dateformat");
        if (this.reminder_date != null && this.reminder_time != null)
            this.reminder_date = dateFormat(this.reminder_date, "dd/mm/yyyy");
        this.data.item.remainderDateTime =
            this.reminder_date + " " + this.reminder_time;
        this.selectDateTimeMatcardEnable = false;
    }
    /**
     * @description - Delete the reminders
     */
    deleteReminder() {
        this.data.item.remainderDateTime = "null null";
    }
    /**
     * @description - this method takes all data and sends it to the backend.
     * Update is happenning based on id
     */
    updateNotes() {
        this.dialogRef.close();

        if (this.data.item.Title != null || this.data.item.Note != null) {
            let dateFormat = require("dateformat");
            if (this.reminder_date != null && this.reminder_time != null)
                this.reminder_date = dateFormat(
                    this.reminder_date,
                    "dd/mm/yyyy"
                );
            this.all_Notes["remainderDateTime"] =
                this.reminder_date + " " + this.reminder_time;

            let obs = this.notesservice.updateNotes(this.data.item);

            obs.subscribe(
                (status: any) => {
                    if (status.status == 404) {
                        alert("Not autorized user");
                    } else {
                        this.all_Notes = status;
                    }
                },
                error => {
                    this.iserror = true;
                    this.errorMessage = error.message;
                }
            );
        }
    }
}
