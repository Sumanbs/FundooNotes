import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class DataService {
  /**
   * API URL
   */
  private loginurl = "http://localhost/codeigniter/Loginpage";
  private registerurl = "http://localhost/codeigniter/Registration";
  private reset_password_url = "http://localhost/codeigniter/forgotpassword";
  private sendTokenurl = "http://localhost/codeigniter/getmailid";
  private resetpwdurl = "http://localhost/codeigniter/resetpassword";

  constructor(private http: HttpClient) {}

  /**
   *@method Getall
   *@param registration any
   *All data converted to JSON format using FORMDATA and calls the registerurl
   */
  Getall(registration) {
    const registerData = new FormData();
    registerData.append("name", registration.name);
    registerData.append("pass", registration.pwd);
    registerData.append("phno", registration.phno);
    registerData.append("email", registration.email);
    return this.http.post(this.registerurl, registerData);
  }
  /**
   *@method user_login
   *@param login any
   *All data converted to JSON format using FORMDATA and calls the loginurl
   */
  user_login(login) {
    const newdata = new FormData();
    newdata.append("email", login.email);
    newdata.append("pass", login.pwd);
    return this.http.post(this.loginurl, newdata);
  }
  /**
   *@method sendtoken
   *@param token any
   *@param option any
   *All data converted to JSON format using FORMDATA and calls the sendTokenurl
   */
  sendtoken(token: any, option: any): any {
    const tokens = new FormData();
    tokens.append("token", token);
    tokens.append("option", option);
    return this.http.post(this.sendTokenurl, tokens);
  }
  /**
   *@method resetService
   *@param pwd any
   *@param token any
   *All data converted to JSON format using FORMDATA and calls the resetpwdurl
   */
  resetService(pwd: any, token: any): any {
    const resetpwd = new FormData();
    resetpwd.append("password", pwd);
    resetpwd.append("token", token);
    return this.http.post(this.resetpwdurl, resetpwd);
  }
  /**
   *@method reset_password
   *@param model any
   *All data converted to JSON format using FORMDATA and calls the reset_password_url
   */
  reset_password(model: any): any {
    const reset_password = new FormData();
    reset_password.append("email", model.email);
    return this.http.post(this.reset_password_url, reset_password);
  }
}
