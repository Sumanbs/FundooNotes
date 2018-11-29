import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class CreatelabelsService {
  /**
   * API URLS
   */
  newLabel_url = "http://localhost/codeigniter/NewLabel";
  getallLabels_url = "http://localhost/codeigniter/getAllLabels";
  editLabel_url = "http://localhost/codeigniter/editLabel";
  deleteLabel_url = "http://localhost/codeigniter/deleteLabel";

  constructor(private http: HttpClient) {}
  /**
   *@method createlabel
   *@param NewLabel string
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the newLabel_url
   */
  createlabel(NewLabel: any, email: any): any {
    const newLabel = new FormData();
    newLabel.append("label", NewLabel);
    newLabel.append("email", email);
    return this.http.post(this.newLabel_url, newLabel);
  }
  /**
   *@method get_all_labels
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the getallLabels_url
   */
  get_all_labels(email: string): any {
    const getall_labels = new FormData();
    getall_labels.append("email", email);
    return this.http.post(this.getallLabels_url, getall_labels);
  }
  /**
   *@method editlabel
   *@param email string
   *@param id integer
   *@param label string
   *All data converted to JSON format using FORMDATA and calls the editLabel_url
   */
  editlabel(email: any, id: any, label: any): any {
    const labels = new FormData();
    labels.append("id", id);
    labels.append("label", label);
    labels.append("email", email);
    return this.http.post(this.editLabel_url, labels);
  }
  /**
   *@method deleteLabel
   *@param email string
   *@param id integer
   *@param label string
   *All data converted to JSON format using FORMDATA and calls the deleteLabel_url
   */
  deleteLabel(email: string, id: any, label: any): any {
    const labels = new FormData();
    labels.append("id", id);
    labels.append("email", email);
    labels.append("label", label);
    return this.http.post(this.deleteLabel_url, labels);
  }
}
