import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class LabelsService {
  /**
   * Declaration of API URLS
   */
  setlabeltonote_url = "http://localhost/codeigniter/setLabelToNote";
  notesWithLabels_url = "http://localhost/codeigniter/notesWithLabels";
  deletelabelinnote_url = "http://localhost/codeigniter/deleteLabelFromNote";
  allLabeledNotes_url = "http://localhost/codeigniter/allLabeledNotes";
  constructor(public http: HttpClient) {}
  /**
   *@method setLabel
   *@param id string
   *@param label string
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the setlabeltonote_url
   */
  setLabel(email: string, id: any, label: any): any {
    const newLabel = new FormData();
    newLabel.append("id", id);
    newLabel.append("email", email);
    newLabel.append("label", label);
    return this.http.post(this.setlabeltonote_url, newLabel);
  }
  /**
   *@method setedLabels
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the notesWithLabels_url
   */
  setedLabels(email: string): any {
    const newLabel = new FormData();
    newLabel.append("email", email);
    return this.http.post(this.notesWithLabels_url, newLabel);
  }
  /**
   *@method deleteLabel
   *@param email string
   *@param id int
   *All data converted to JSON format using FORMDATA and calls the deletelabelinnote_url
   */
  deleteLabel(email: any, id: any): any {
    const newLabel = new FormData();
    newLabel.append("email", email);
    newLabel.append("id", id);
    return this.http.post(this.deletelabelinnote_url, newLabel);
  }
  /**
   *@method get_all_notes
   *@param email string
   *@param id int
   *All data converted to JSON format using FORMDATA and calls the allLabeledNotes_url
   */
  get_all_notes(email, label: any): any {
    const newLabel = new FormData();
    newLabel.append("email", email);
    newLabel.append("label", label);
    return this.http.post(this.allLabeledNotes_url, newLabel);
  }
}
