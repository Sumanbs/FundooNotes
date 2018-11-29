import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class DragDropService {
  DragDrop_url = "http://localhost/codeigniter/DragAndDrop";
  constructor(public http: HttpClient) {}

  dragnotes(email: string, id: any, loops: any): any {
    const data = new FormData();
    debugger;
    data.append("email", email);
    data.append("id", id);
    data.append("loop", loops);
    this.http.post(this.DragDrop_url, data);
  }
}
