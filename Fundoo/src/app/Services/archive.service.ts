import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceURL } from "../Services/ServiceURL";

@Injectable({
    providedIn: "root"
})
export class ArchiveService {
    /**
     * HttpClient is injected in the constructor
     */
    constructor(private http: HttpClient, private API_URL: ServiceURL) {}
    /**
     *@method ArchivenoteComponenr
     *@param email string
     *@param id integer
     *All data converted to JSON format using FORMDATA and calls the archiveNote_url
     */
    archiveNote(email: string, id: any): any {
        debugger;
        const data = new FormData();
        data.append("id", id);
        data.append("email", email);
        return this.http.post(this.API_URL.archiveNote_url, data);
    }
    /**
     *@method getArchivedNotes
     *@param email string
     *All data converted to JSON format using FORMDATA and calls the getArchivedNotes_url
     */
    getArchivedNotes(email: string): any {
        const mailid = new FormData();
        mailid.append("email", email);
        return this.http.post(this.API_URL.getArchivedNotes_url, mailid);
    }
    /**
     *@method unarchiveNote
     *@param email string
     *@param id integer
     *All data converted to JSON format using FORMDATA and calls the unArchiveNote_url
     */
    unarchiveNote(email: string, id: any): any {
        const data = new FormData();
        data.append("email", email);
        data.append("id", id);
        return this.http.post(this.API_URL.unArchiveNote_url, data);
    }
}
