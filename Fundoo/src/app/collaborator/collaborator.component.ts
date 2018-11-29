import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CookieService } from "angular2-cookie";
import { FormControl, Validators } from "@angular/forms";
import { CollaboratorService } from "../Services/collaborator.service";
@Component({
  selector: "app-collaborator",
  templateUrl: "./collaborator.component.html",
  styleUrls: ["./collaborator.component.css"]
})
export class CollaboratorComponent implements OnInit {
  /**
   * iserror,errorMessage variable is used to dispaly HTTP ERROR messages
   */
  iserror: boolean;
  errorMessage: any;
  /**
   *@invalidmail- Email validation is true or false
   */
  invalidmail: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cookie: CookieService,
    public clollaboratorservice: CollaboratorService
  ) {}
  /**
   * Email id of the lperson who logged in
   */
  email: any;
  emailid: any;
  /**
   * Array of added collaborators
   */
  addedcollaborators: any = [];
  /**
   * Initialize index of addedcollaborators array
   */
  i = 0;
  ngOnInit() {
    this.email = this.cookie.get("key");
  }
  /**
   * emails get the validation for the email id
   */
  emails = new FormControl("", [Validators.required, Validators.email]);

  /**
   * @method checkCollaborator
   * @param string
   * This method verifies the entered email.
   * If successful it adds to the collaborator array
   */
  checkCollaborator(email) {
    let observer = this.clollaboratorservice.verifyemail(email);
    observer.subscribe(
      (result: any) => {
        if (result.status == 200) {
          this.addedcollaborators[this.i] = this.emailid;
          this.i++;
          this.emailid = null;
        } else if (result.status == 401) {
          this.invalidmail = true;
          alert("MailID is not registered");
        }
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
  /**
   * @method deletemail
   * @param any
   * This method deletes the email id from addedcollaborators array
   */
  deletemail(item) {
    let variable: any = [];
    let j = 0;
    debugger;
    for (let index = 0; index < this.addedcollaborators.length; index++) {
      if (item != this.addedcollaborators[index]) {
        variable[j] = this.addedcollaborators[index];
        j++;
      }
    }
    this.addedcollaborators = [];
    for (let index = 0; index < j; index++) {
      this.addedcollaborators[index] = variable[index];
    }
    this.i = j;
  }
  saveCollaborator() {
    this.dialogRef.close(this.addedcollaborators);
  }
}
