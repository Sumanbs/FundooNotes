import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class AuthenticateService {
  constructor() {}
  /**
   * @method getjwt
   * This method checks whether the token is present in the
   * localstorage or not.
   * @return boolean
   */
  getjwt() {
    return !!localStorage.getItem("token");
  }
}
