import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DataService } from "../Services/data.service";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  public errorMessage = {};
  public iserror = false;
  public issubmit = false;
  public response = true;
  /**
   * dis - disable the button
   */
  public dis = false;
  constructor(private data: DataService) {}
  model: any = {};
  ngOnInit() {}
  /**
   * Email validation
   */
  email = new FormControl("", [Validators.required, Validators.email]);
  /**
   * @method onclick()
   *@description - It takes the email and sends it to the backend for reset link.
   */
  onclick() {
    this.issubmit = true;
    this.dis = true;
    let obs = this.data.reset_password(this.model);
    obs.subscribe(
      (s: any) => {
        if (s.status == "200") {
          this.issubmit = false;
          this.dis = false;
          alert("A reset password link has sent to registered email ID");
        } else if (s.status == "500") {
          alert("Email not sent");
        } else if (s.status == "3") {
          alert("Internal Error");
        } else if (s.status == "4") {
          this.issubmit = false;
          alert("Email ID not activated..Please register again");
        }
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
}
