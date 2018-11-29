import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DataService } from "../Services/data.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  iserror: boolean;
  errorMessage: any;
  public issubmit = false;
  constructor(private data: DataService) {}
  ngOnInit() {}
  /**
   * @name - Username validation
   */
  name = new FormControl("", [
    Validators.required,
    Validators.pattern("[a-zA-Z]*"),
    Validators.minLength(3),
    Validators.maxLength(10)
  ]);
  /**
   * @method getNameErrorMessage()
   * @description - This method is used to display the error message for username based on conditions
   */
  getNameErrorMessage() {
    if (this.name.hasError("required")) {
      this.model.nametemp = "";
      return "You must enter a UserName";
    } else if (this.name.hasError("minLength")) {
      this.model.nametemp = "";
      return "minimum 3 characters required";
    } else if (this.name.hasError("maxLength")) {
      this.model.nametemp = "";
      return "maximum 10 characters required";
    } else if (this.name.hasError("pattern")) {
      this.model.nametemp = "";
      return "Numbers and special characters are not allowed";
    } else return "";
  }
  /**
   * @phno - Phone number validation
   */
  phno = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9]{10}")
  ]);
  /**
   * @method getphnoErrorMessage()
   * @description - This method is used to display the error message for phone number based on conditions
   */
  getphnoErrorMessage() {
    if (this.phno.hasError("required")) {
      this.model.phnotemp = "";
      return "You must enter a phone number";
    } else if (this.phno.hasError("pattern")) {
      this.model.phnotemp = "";
      return "Not a valid phone number";
    } else {
      return "";
    }
  }
  /**
   * @email - Email ID validation
   */
  email = new FormControl("", [Validators.required, Validators.email]);
  /**
   * @method getErrorMessage()
   * @description - This method is used to display the error message for email based on conditions
   */
  getErrorMessage() {
    if (this.email.hasError("required")) {
      this.model.emailtemp = "";
      return "You must enter a value";
    } else if (this.email.hasError("email")) {
      this.model.emailtemp = "";
      return "Not a valid email";
    } else return "";
  }
  /**
   * @password - Password validation
   */
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  /**
   * @method getPasswordErrorMessage()
   * @description - This method is used to display the error message for password based on conditions
   */
  getPasswordErrorMessage() {
    if (this.password.hasError("required")) {
      this.model.temppwd = "";
      return "You must enter a Password";
    } else return "Minimum 4 characters required";
  }
  /**
   * @method putdata()
   * @description -  this method sends registration data to backend.
   */
  putdata() {
    this.issubmit = true;
    let obs = this.data.Getall(this.model);
    obs.subscribe(
      (s: any) => {
        if (s.status == "200") {
          this.issubmit = false;
          alert(
            "A link has been sent to your registered mail id.Open the link to activate your account."
          );
        } else if (s.status == "400") {
          this.issubmit = false;
          alert("Registration is not successful please try again");
        } else if (s.status == "406") {
          this.issubmit = false;
          alert("Email ID is registered,Select Forgot password");
        }
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
}
