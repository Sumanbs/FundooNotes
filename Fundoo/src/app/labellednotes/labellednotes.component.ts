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
@Component({
    selector: "app-labellednotes",
    templateUrl: "./labellednotes.component.html",
    styleUrls: ["./labellednotes.component.css"]
})
export class LabellednotesComponent implements OnInit, OnDestroy {
    allLabels: any;
    reminder_date: any;
    reminder_time: any;
    reminder = false;
    enable = false;
    enable_other_cards = false;
    mail: any;
    email: string;
    iserror: boolean;
    errorMessage: any;
    errorstack: any;
    all_notes;
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
    subscribed: Subscription;
    enable8: boolean = true;
    enable13: boolean = true;
    enable20: boolean = true;
    id1: any;
    enableDateTimeMenu: boolean = true;
    selectedLabels: any;
    selectedLabelToDispalyNotes: any;
    obs: any;
    constructor(
        private cookie: CookieService,
        private notesservice: NotesService,
        private commonService: CommonService,
        private router: Router,
        public dialog: MatDialog,
        public archive: ArchiveService,
        public createlabels: CreatelabelsService,
        public labelsservice: LabelsService
    ) {
        this.subscription = this.commonService.getData().subscribe(message => {
            this.message = message;
        });
        setInterval(() => {
            this.datefunction();
        }, 40000);
        this.subscribed = this.commonService
            .getSelectedLabel()
            .subscribe(label => {
                this.selectedLabelToDispalyNotes = label;

                let email = this.cookie.get("key");
                /**
                 * get selected labels
                 */
                let obs = this.labelsservice.get_all_notes(
                    email,
                    this.selectedLabelToDispalyNotes
                );
                obs.subscribe(
                    (status: any) => {
                        this.all_notes = status;
                    },
                    error => {
                        this.iserror = true;
                        this.errorMessage = error.message;
                    }
                );
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscribed.unsubscribe();
        this.obs.unsubscribe();
    }

    model: any = {};
    public Observable;
    ngOnInit() {
        let email = this.cookie.get("key");
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
    selectColor(colour) {
        this.color = colour;
    }
    onClose() {
        this.enable = false;
        this.email = this.cookie.get("key");
        if (this.model.title != null || this.model.note != null) {
            let dateFormat = require("dateformat");

            if (this.reminder_date != null && this.reminder_time != null)
                this.reminder_date = dateFormat(
                    this.reminder_date,
                    "dd/mm/yyyy"
                );

            let remainderDateTime =
                this.reminder_date + " " + this.reminder_time;

            let obs = this.notesservice.sendnotes(
                this.model,
                this.email,
                remainderDateTime,
                this.color,
                this.archived,
                "null"
            );

            obs.subscribe(
                (status: any) => {
                    if (status.status == 404) {
                        alert("Not autorized user");
                        localStorage.removeItem("token");
                        this.router.navigate(["/login"]);
                    } else {
                        this.all_notes = status;
                    }
                },
                error => {
                    this.iserror = true;
                    this.errorMessage = error.message;
                }
            );
            this.model.title = null;
            this.model.note = null;
            this.reminder_date = null;
            this.reminder_time = null;
            this.reminderSet = false;
        }
        this.color = null;
    }
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

    select8pm(cardselection) {
        if (cardselection == "main") {
            this.reminderSet = true;
        }

        let dateFormat = require("dateformat");
        let now = new Date();
        this.reminder_date = dateFormat(now, "dd/mm/yyyy");
        this.reminder_time = "08:00 pm";
    }
    select8am(cardselection) {
        if (cardselection == "main") {
            this.reminderSet = true;
        }
        let dateFormat = require("dateformat");
        let now = new Date();
        this.reminder_date = dateFormat(now, "dd/mm/yyyy");
        this.reminder_time = "08:00 am";
    }
    select1pm(cardselection) {
        if (cardselection == "main") {
            this.reminderSet = true;
        }
        let dateFormat = require("dateformat");
        let now = new Date();
        this.reminder_date = dateFormat(now, "dd/mm/yyyy");
        this.reminder_time = "01:00 pm";
    }
    othercardReminder(id) {
        this.all_notes.forEach(element => {
            if (element.id == id) {
                this.enableDateTimeMenu = true;
                this.id1 = id;
            }
        });
    }
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
    openDialog(item): void {
        var dialogRef = this.dialog.open(EditnotesComponent, {
            width: "550px",
            height: "30%",
            data: { item }
        });
        dialogRef.afterClosed().subscribe(result => {
            // console.log(result);
        });
    }
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
    assignLabel(nid, lid) {
        if (nid == lid) {
            return true;
        } else return false;
    }
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
}
