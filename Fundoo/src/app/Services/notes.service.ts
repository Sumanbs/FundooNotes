import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NotesService {
  /**
   * API URL's
   */
  notes_url = "http://localhost/codeigniter/createnotes";
  all_notes_url = "http://localhost/codeigniter/all_notes";
  updateremainder_url = "http://localhost/codeigniter/setRemainder";
  deleteReminder_url = "http://localhost/codeigniter/deleteRemainder";
  changeColor_url = "http://localhost/codeigniter/changeColor";
  updatesNotes_url = "http://localhost/codeigniter/updateNotes";
  deleteNote_url = "http://localhost/codeigniter/deleteNotes";
  profilepic_url = "http://localhost/codeigniter/setImage";
  getImage_url = "http://localhost/codeigniter/getImage";
  imageFile_url = "http://localhost/codeigniter/imageFile";
  DragDrop_url = "http://localhost/codeigniter/DragAndDrop";
  Image_url = "http://localhost/codeigniter/image";
  constructor(private http: HttpClient) {}
  /**
   *@method sendnotes
   *@param email string
   *@param model any
   *@param date string
   *@param color string
   *@param archived string
   *@param selectedCollaborators string
   *All data converted to JSON format using FORMDATA and calls the notes_url
   */
  sendnotes(
    model: any,
    email: any,
    date: any,
    color: any,
    archived: any,
    selectedCollaborators: any
  ): any {
    const new_notes = new FormData();
    new_notes.append("title", model.title);
    new_notes.append("note", model.note);
    new_notes.append("email", email);
    new_notes.append("date", date);
    new_notes.append("color", color);
    new_notes.append("archived", archived);
    new_notes.append("selectedCollaborators", selectedCollaborators);
    return this.http.post(this.notes_url, new_notes);
  }
  /**
   *@method updateNotes
   *@param notesarray string
   *All data converted to JSON format using FORMDATA and calls the updatesNotes_url
   */
  updateNotes(notesarray: any): any {
    const updatenotes = new FormData();
    updatenotes.append("note", notesarray.Note);
    updatenotes.append("title", notesarray.Title);
    updatenotes.append("color", notesarray.color);
    updatenotes.append("id", notesarray.id);
    updatenotes.append("date", notesarray.remainderDateTime);
    return this.http.post(this.updatesNotes_url, updatenotes);
  }
  /**
   *@method get_all_notes
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the all_notes_url
   */
  get_all_notes(email: string): any {
    const mailid = new FormData();
    mailid.append("email", email);
    return this.http.post(this.all_notes_url, mailid);
  }
  /**
   *@method updateReminder
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the all_notes_url
   */
  updateReminder(id: any, remainderDateTime: string): any {
    const updateremainder = new FormData();
    updateremainder.append("id", id);
    updateremainder.append("remainderDateTime", remainderDateTime);
    return this.http.post(this.updateremainder_url, updateremainder);
  }
  /**
   *@method deleteReminder
   *@param id integer
   *All data converted to JSON format using FORMDATA and calls the deleteReminder_url
   */
  deleteReminder(id: any): any {
    const deleteremainder = new FormData();
    deleteremainder.append("id", id);
    return this.http.post(this.deleteReminder_url, deleteremainder);
  }
  /**
   *@method changeColor
   *@param id integer
   *@param color any
   *All data converted to JSON format using FORMDATA and calls the changeColor_url
   */
  changeColor(id: any, color: any): any {
    const changecolor = new FormData();
    changecolor.append("id", id);
    changecolor.append("color", color);
    return this.http.post(this.changeColor_url, changecolor);
  }
  /**
   *@method deleteNote
   *@param id integer
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the deleteNote_url
   */
  deleteNote(id: any, email: any): any {
    const deleteNotes = new FormData();
    deleteNotes.append("id", id);
    deleteNotes.append("email", email);
    return this.http.post(this.deleteNote_url, deleteNotes);
  }
  /**
   *@method getImage
   *@param email string
   *All data converted to JSON format using FORMDATA and calls the getImage_url
   */
  getImage(email: string): any {
    const data = new FormData();
    data.append("email", email);
    return this.http.post(this.getImage_url, data);
  }
  /**
   *@method takeimagefile
   *@param email string
   *@param fileToUpload file
   *All data converted to JSON format using FORMDATA and calls the imageFile_url
   */
  takeimagefile(email, fileToUpload: File): any {
    const data = new FormData();
    data.append("email", email);
    data.append("file", fileToUpload, fileToUpload.name);
    return this.http.post(this.imageFile_url, data);
  }
  /**
   *@method dragnotes
   *@param email string
   *@param id int
   *@param loop int
   *@param direction int
   *All data converted to JSON format using FORMDATA and calls the DragDrop_url
   */
  dragnotes(email: any, id: any, loops: any, direction: any): any {
    const data = new FormData();

    data.append("email", email);
    data.append("id", id);
    data.append("loop", loops);
    data.append("direction", direction);
    return this.http.post(this.DragDrop_url, data);
  }
  base64image(email: string, base64url: any): any {
    const data = new FormData();

    data.append("email", email);
    data.append("base64url", base64url);
    return this.http.post(this.Image_url, data);
  }
}
