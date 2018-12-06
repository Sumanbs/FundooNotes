import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material";
import { DataService } from "../Services/data.service";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie";
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from "angular-6-social-login";
import { LoggerServiceService } from "../Services/Logger/logger-service.service";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    model: any = {};
    public flag = false;
    public temp = true;
    public fail = "";
    public iserror = true;
    public errorstack;
    public errorMessage;
    successful: boolean = false;
    routerLink: string;
    obs: any;
    emailid: string;
    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private data: DataService,
        private router: Router,
        private cookie: CookieService,
        private socialAuthService: AuthService,
        private logger: LoggerServiceService
    ) {
        iconRegistry.addSvgIcon(
            "facebook",
            sanitizer.bypassSecurityTrustResourceUrl(
                "assets/img/Login/facebook.svg"
            )
        );
        iconRegistry.addSvgIcon(
            "gmail",
            sanitizer.bypassSecurityTrustResourceUrl(
                "assets/img/Login/gmail.svg"
            )
        );
    }
    ngOnInit() {}

    /**
     * Email validation
     */
    email = new FormControl("", [Validators.required, Validators.email]);
    /**
     * @method getErrorMessage
     * @description - Dispaly error if email is not valid
     */
    getErrorMessage() {
        if (this.email.hasError("required")) {
            this.model.a = null;
            return "You must enter a value";
        } else if (this.email.hasError("email")) {
            this.model.a = null;
            return "Not a valid email";
        } else return "";
    }
    /**
     * Password validation
     */
    password = new FormControl("", [Validators.required]);
    /**
     * @method getPasswordErrorMessage
     * @description - Dispaly error if password is not valid
     */
    getPasswordErrorMessage() {
        if (this.flag == true) {
            return "Invalid password";
        } else if (this.password.hasError("required")) {
            this.model.pass = null;
            return "You must enter a Password";
        } else {
            this.model.pass = null;
            return "Minimum 4 characters required";
        }
    }
    /**
     * @method sendLoginData
     * @description - This method sends the login data to backend for verification
     */
    sendLoginData() {
        let obs = this.data.user_login(this.model);
        this.cookie.put("key", this.model.email);
        obs.subscribe(
            (result: any) => {
                if (result.status == 200) {
                    localStorage.setItem("token", result.jwt);
                    this.router.navigate(["/fundoo"]);
                    this.fail = "";
                } else if (result.status == 401) {
                    this.flag = true;
                    this.fail = "Invalid password";
                    alert("Login Unsuccessfull");
                }
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
    }
    /**
     * @method socialSignIn
     * @param - string
     * @description - login using facebook and google.
     */
    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
            this.sendToApi(
                userData.token,
                userData.email,
                userData.image,
                userData.name
            );
        });
    }
    /**
     * @method sendToApi
     * @param token
     * @param email
     * @param image
     * @param name
     * @description - This method adds
     */
    sendToApi(token: string, email: string, image: string, name: string): any {
        this.emailid = email;
        alert(this.emailid);
        let obs = this.data.facebook_login(this.emailid, name, image);
        this.cookie.put("key", email);
        this.cookie.put("imageurl", image);
        obs.subscribe(
            (s: any) => {
                if (s.status == 200) {
                    localStorage.setItem("token", s.jwt);
                    this.router.navigate(["/fundoo"]);
                    this.fail = "";
                } else if (s.status == 400) {
                    this.flag = true;
                    this.fail = "Invalid password";
                    alert("Login Unsuccessfull");
                }
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
    }
}
