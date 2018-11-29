import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class TrashService {
  /**
   * API URLS
   */
  getDeletedNotes_url = "http://localhost/codeigniter/getDeletedNotes";
  restoreNote_url = "http://localhost/codeigniter/restoreNote";
  deletePermanently_url = "http://localhost/codeigniter/deleteNotePermanently";
  constructor(public http: HttpClient) {}
  /**
   *@method getDeletedNotes
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the getDeletedNotes_url
   */
  getDeletedNotes(email: string): any {
    const data = new FormData();
    data.append("email", email);
    return this.http.post(this.getDeletedNotes_url, data);
  }
  /**
   *@method restoreNote
   *@param email string
   *@param id integer
   *All data converted to JSON format using FORMDATA and calls the restoreNote_url
   */
  restoreNote(email: string, id: any): any {
    const data = new FormData();
    data.append("email", email);
    data.append("id", id);
    return this.http.post(this.restoreNote_url, data);
  }
  /**
   *@method deletePermanently
   *@param email string
   *@param id integer
   *All data converted to JSON format using FORMDATA and calls the deletePermanently_url
   */
  deletePermanently(email: string, id: any): any {
    const data = new FormData();
    data.append("email", email);
    data.append("id", id);
    return this.http.post(this.deletePermanently_url, data);
  }
}
