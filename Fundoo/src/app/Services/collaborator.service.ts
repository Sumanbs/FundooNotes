import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceURL } from "../Services/ServiceURL";
@Injectable({
    providedIn: "root"
})
export class CollaboratorService {
    constructor(public http: HttpClient, private API_URL: ServiceURL) {}
    /**
     *@method verifyemail
     *@param email string
     *All data converted to JSON format using FORMDATA and calls the collaboratorverifyemail_url
     */
    verifyemail(email: any): any {
        const mailid = new FormData();
        mailid.append("email", email);
        return this.http.post(this.API_URL.collaboratorVerifyEmail_url, mailid);
    }
    /**
     *@method getCollaboratorsforNotes
     *@param email string
     *@param id integer
     *All data converted to JSON format using FORMDATA and calls the getCollaboratorsforNotes
     */
    getCollaboratorsforNotes(email, id): any {
        const data = new FormData();
        data.append("email", email);
        data.append("id", id);
        return this.http.post(this.API_URL.notesCollaborator_url, data);
    }
    /**
     *@method addCollaborator
     *@param loggedInemail string
     *@param owner string
     *@param shared string
     *@param id integer
     *All data converted to JSON format using FORMDATA and calls the addCollaborator_url
     */
    addCollaborator(loggedInemail, id: any, owner: any, shared: any): any {
        const data = new FormData();
        data.append("email", loggedInemail);
        data.append("owner", owner);
        data.append("shared", shared);
        data.append("id", id);
        return this.http.post(this.API_URL.addCollaborator_url, data);
    }
    /**
     *@method deleteColaborator
     *@param email string
     *@param cid integer
     *@param noteid integer
     *All data converted to JSON format using FORMDATA and calls the deleteCollaborator_url
     */
    deleteColaborator(email, noteid, cid: any): any {
        const data = new FormData();
        data.append("cid", cid);
        data.append("email", email);
        data.append("noteid", noteid);
        return this.http.post(this.API_URL.deleteCollaborator_url, data);
    }
}
