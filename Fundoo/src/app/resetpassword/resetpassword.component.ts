import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../Services/data.service";

@Component({
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.css"]
})
export class ResetpasswordComponent implements OnInit {
  errorMessage: any;
  iserrorr: boolean;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {}
  public token;
  public emailid;
  public error = "Welcome";
  public iserror = false;
  public pwd;
  public option = "reset";
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token = params["token"];
    });
    let obs = this.data.sendtoken(this.token, this.option);

    obs.subscribe((response: any) => {
      if (response.email != null) this.emailid = response.email;
      else {
        this.error = "Your session has been expired";
        this.iserror = true;
      }
    });
  }
  /**
   * @password - Password validation
   */
  password = new FormControl("", [Validators.required]);
  /**
   * @method getPasswordErrorMessage()
   * @description - This method is used to display the error message for password based on conditions.
   */
  getPasswordErrorMessage() {
    if (this.password.hasError("required")) {
      return "You must enter a Password";
    } else {
      return "Minimum 4 characters required";
    }
  }
  Onclick() {
    let obs = this.data.resetService(this.pwd, this.token);
    obs.subscribe(
      (response: any) => {
        if (response.status == 200) {
          alert("Reset successful");
        } else if (response.status == 500) {
          alert("Reset Unsuccessful");
        }
      },
      error => {
        this.iserrorr = true;
        this.errorMessage = error.message;
      }
    );
  }
}
