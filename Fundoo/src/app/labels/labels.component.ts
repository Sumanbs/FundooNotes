import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, Inject } from "@angular/core";
import { CreatelabelsService } from "../Services/createlabels.service";
import { CookieService } from "angular2-cookie";
import { NotesArray } from "../core/model/notes";
import { LabelArray } from "./../core/model/notes";
import { CollaboratorArray } from "../core/model/notes";
@Component({
    selector: "app-labels",
    templateUrl: "./labels.component.html",
    styleUrls: ["./labels.component.css"]
})
export class LabelsComponent {
    /**
     * @iserror - Checks for any HTTP error.
     */
    iserror: boolean;
    /**
     * @errorMessage - Stores the error message.
     */
    errorMessage: any;
    /**
     * @allLabels - Array of Labels
     */
    allLabels: any;
    /**
     * @alldata - Array of Notes
     */
    alldata: any;
    obs: any;

    constructor(
        public dialogRef: MatDialogRef<LabelsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public labels: CreatelabelsService,
        private cookie: CookieService
    ) {}
    NewLabel: any;
    ngOnInit() {
        let email = this.cookie.get("key");
        let obs = this.labels.get_all_labels(email);
        obs.subscribe(
            (status: any) => {
                this.allLabels = status;
                console.log("Ng on");
                console.log(this.allLabels);
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
    }

    enableEditButton = true;
    /**
     * @method saveLabel()
     * @description - this method creates the new label
     */
    saveLabel() {
        if (this.NewLabel != null || this.NewLabel != undefined) {
            let email = this.cookie.get("key");
            let obs = this.labels.createlabel(this.NewLabel, email);

            obs.subscribe(
                (status: any) => {
                    this.allLabels = status;
                    this.dialogRef.close(this.allLabels);
                },
                error => {
                    this.iserror = true;
                    this.errorMessage = error.message;
                }
            );
        } else {
            this.dialogRef.close(this.alldata);
        }
    }
    /**
     * @method buttonenable()
     * @description - This method is used to enable the delete ot save button lable form field
     */
    buttonenable(id) {
        this.allLabels.forEach(element => {
            if (element.id == id) {
                element.editenable = false;
            } else {
                element.editenable = true;
            }
        });
    }
    /**
     * @method saveEditedLabel
     * @param id int
     * @param label string
     * @description - Edits the label based on the ID
     */
    saveEditedLabel(id, label) {
        let email = this.cookie.get("key");
        let obs = this.labels.editlabel(email, id, label);
        obs.subscribe(
            (status: any) => {
                this.alldata = status;
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
    }
    /**
     * @method deleteLabel
     * @param id
     * @param label
     * @description - this method deletes the label based on id
     */
    deleteLabel(id, label) {
        let email = this.cookie.get("key");
        let obs = this.labels.deleteLabel(email, id, label);
        obs.subscribe(
            (status: any) => {
                this.allLabels = status;
                this.alldata = status;
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
    }
}
