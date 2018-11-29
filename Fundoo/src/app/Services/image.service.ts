import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class ImageService {
  uploadimage_url = "http://localhost/codeigniter/setimage";
  uploadimage(email: any, path: any): any {
    debugger;
    const uploadData = new FormData();
    uploadData.append("email", email);
    uploadData.append("path", path);
    this.http.post(this.uploadimage_url, uploadData);
  }
  constructor(private http: HttpClient) {}
}
