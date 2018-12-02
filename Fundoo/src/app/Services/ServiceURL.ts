export class ServiceURL {
    public host = "http://localhost/codeigniter/";
    public archiveNote_url = this.host + "archiveNote";
    public getArchivedNotes_url = this.host + "getArchivedNotes";
    public unArchiveNote_url = this.host + "unArchiveNote";
    /**
     * Collaborator URL
     */
    public collaboratorVerifyEmail_url = this.host + "collaboratorverifyemail";
    public notesCollaborator_url = this.host + "notesCollaborator";
    public addCollaborator_url = this.host + "addCollaborator";
    public deleteCollaborator_url = this.host + "deleteCollaborator";
    /**
     * Labels URLS
     */
    public newLabel_url = this.host + "NewLabel";
    public getallLabels_url = this.host + "getAllLabels";
    public editLabel_url = this.host + "editLabel";
    public deleteLabel_url = this.host + "deleteLabel";

    /**
     *Account URLS
     */

    public loginurl = this.host + "Loginpage";
    public registerurl = this.host + "Registration";
    public reset_password_url = this.host + "forgotpassword";
    public sendTokenurl = this.host + "getmailid";
    public resetpwdurl = this.host + "resetpassword";

    /**
     *Drag and Drop URLS
     */
    public DragDrop_url = this.host + "DragAndDrop";
    /**
     *Image urls
     */
    public uploadimage_url = this.host + "setimage";
    /**
     * Labels Service
     */

    public setlabeltonote_url = this.host + "setLabelToNote";
    public notesWithLabels_url = this.host + "notesWithLabels";
    public deletelabelinnote_url = this.host + "deleteLabelFromNote";
    public allLabeledNotes_url = this.host + "allLabeledNotes";

    /**
     *Notes URLS
     */

    public notes_url = this.host + "createnotes";
    public all_notes_url = this.host + "all_notes";
    public updateremainder_url = this.host + "setRemainder";
    public deleteReminder_url = this.host + "deleteRemainder";
    public changeColor_url = this.host + "changeColor";
    public updatesNotes_url = this.host + "updateNotes";

    public deleteNote_url = this.host + "deleteNotes";
    public profilepic_url = this.host + "setImage";
    public getImage_url = this.host + "getImage";
    public imageFile_url = this.host + "saveImage";

    public FetchImage_URL = this.host + "fetchImage";
    /**
     * trash URL
     */
    public getDeletedNotes_url = this.host + "getDeletedNotes";
    public restoreNote_url = this.host + "restoreNote";
    public deletePermanently_url = this.host + "deleteNotePermanently";
}
