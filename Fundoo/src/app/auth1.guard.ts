import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticateService } from "./Services/authenticate.service";
@Injectable({
  providedIn: "root"
})
export class Auth1Guard implements CanActivate {
  valid: Boolean = false;
  constructor(public router: Router, private service: AuthenticateService) {}
  canActivate(): boolean {
    if (this.service.getjwt()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
