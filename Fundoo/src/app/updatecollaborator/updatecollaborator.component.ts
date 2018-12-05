import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CookieService } from "angular2-cookie";
import { CollaboratorService } from "../Services/collaborator.service";
import { FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-updatecollaborator",
    templateUrl: "./updatecollaborator.component.html",
    styleUrls: ["./updatecollaborator.component.css"]
})
export class UpdatecollaboratorComponent implements OnInit {
    owner: any = this.cookie.get("key");
    loggedInmail: string;
    constructor(
        public dialogRef: MatDialogRef<UpdatecollaboratorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public cookie: CookieService,
        public clollaboratorservice: CollaboratorService
    ) {}
    collaborators: any;
    emails = new FormControl("", [Validators.required, Validators.email]);
    /**
     * emailid -userInput
     */
    emailid: any;
    allCollaborator: any;
    ngOnInit() {
        this.loggedInmail = this.cookie.get("key");
        /**
         * Get the Collaborator for the particular note from DB
         */
        let obs1 = this.clollaboratorservice.getCollaboratorsforNotes(
            this.loggedInmail,
            this.data.id
        );
        obs1.subscribe(
            (status: any) => {
                this.collaborators = status.noteCollaborator;
                /**
                 * Set the owner for the Collaborator
                 */
                this.collaborators.forEach(element => {
                    this.owner = element.owner;
                });
            },
            error => {}
        );
    }
    /**
     *This is used add the collaborator
     */
    addCollaborator(owner, shared) {
        var notExists = true;
        this.collaborators.forEach(element => {
            if (element.owner == this.owner && element.shared == shared) {
                notExists = false;
                alert("already added");
            }
        });
        if (notExists == true) {
            let obs1 = this.clollaboratorservice.addCollaborator(
                this.loggedInmail,
                this.data.id,
                owner,
                shared
            );
            obs1.subscribe(
                (status: any) => {
                    debugger;
                    this.collaborators = status.noteCollaborator;
                    this.allCollaborator = status.allCollaborator;
                },
                error => {}
            );
        }
    }

    deleteCollaborator(cid, toBeDeleted) {
        debugger;
        let email = this.cookie.get("key");
        if (this.owner == email || toBeDeleted == email) {
            let obs1 = this.clollaboratorservice.deleteColaborator(
                email,
                this.data.id,
                cid
            );
            obs1.subscribe(
                (status: any) => {
                    debugger;
                    this.collaborators = status.noteCollaborator;

                    this.allCollaborator = status.allCollaborator;
                },
                error => {}
            );
        } else {
            alert("You cannot delete others");
        }
    }
    onClose() {
        this.dialogRef.close(this.allCollaborator);
    }
}
