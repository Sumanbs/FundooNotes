import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceURL } from "../Services/ServiceURL";
@Injectable({
    providedIn: "root"
})
export class TrashService {
    constructor(public http: HttpClient, private API_URL: ServiceURL) {}
    /**
     *@method getDeletedNotes
     *@param email string
     *All data converted to JSON format using FORMDATA and calls the getDeletedNotes_url
     */
    getDeletedNotes(email: string): any {
        const data = new FormData();
        data.append("email", email);
        return this.http.post(this.API_URL.getDeletedNotes_url, data);
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
        return this.http.post(this.API_URL.restoreNote_url, data);
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
        return this.http.post(this.API_URL.deletePermanently_url, data);
    }
}
