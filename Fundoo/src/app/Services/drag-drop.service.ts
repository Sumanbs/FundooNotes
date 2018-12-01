import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceURL } from "../Services/ServiceURL";
@Injectable({
    providedIn: "root"
})
export class DragDropService {
    constructor(public http: HttpClient, private API_URL: ServiceURL) {}

    dragnotes(email: string, id: any, loops: any): any {
        const data = new FormData();
        debugger;
        data.append("email", email);
        data.append("id", id);
        data.append("loop", loops);
        this.http.post(this.API_URL.DragDrop_url, data);
    }
}
