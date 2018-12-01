import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceURL } from "../Services/ServiceURL";
@Injectable({
    providedIn: "root"
})
export class ImageService {
    uploadimage(email: any, path: any): any {
        debugger;
        const uploadData = new FormData();
        uploadData.append("email", email);
        uploadData.append("path", path);
        this.http.post(this.API_URL.uploadimage_url, uploadData);
    }
    constructor(private http: HttpClient, private API_URL: ServiceURL) {}
}
