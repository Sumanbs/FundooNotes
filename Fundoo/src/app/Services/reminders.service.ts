import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceURL } from "../Services/ServiceURL";
@Injectable({
    providedIn: "root"
})
export class RemindersService {
    /**
     * API URL'S
     */
    getReminders_url = "http://localhost/codeigniter/getReminders";
    savenote_url = "http://localhost/codeigniter/saveNote";
    constructor(public http: HttpClient, private API_URL: ServiceURL) {}
    /**
     *@method savenote
     *@param email string
     *@param model any
     *@param date string
     *@param color string
     *@param archived string
     *All data converted to JSON format using FORMDATA and calls the savenote_url
     */
    savenote(
        model: any,
        email: string,
        date: string,
        color: any,
        archived: any
    ): any {
        const new_notes = new FormData();
        new_notes.append("title", model.title);
        new_notes.append("note", model.note);
        new_notes.append("email", email);
        new_notes.append("date", date);
        new_notes.append("color", color);
        new_notes.append("archived", archived);
        return this.http.post(this.savenote_url, new_notes);
    }

    /**
     *@method get_all_notes
     *@param mailid string
     *All data converted to JSON format using FORMDATA and calls the getReminders_url
     */
    get_all_notes(email: string): any {
        const mailid = new FormData();
        mailid.append("email", email);
        return this.http.post(this.getReminders_url, mailid);
    }
}
