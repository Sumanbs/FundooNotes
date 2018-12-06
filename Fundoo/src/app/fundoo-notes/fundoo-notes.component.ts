import { MatDialog } from "@angular/material";
import { CreatelabelsService } from "../Services/createlabels.service";
import { Router } from "@angular/router";
import { Component, inject } from "@angular/core";
import { NotesService } from "../Services/notes.service";
import { CommonService } from "../Services/list-grid.service";
import { LabelsComponent } from "../labels/labels.component";
import { CookieService } from "angular2-cookie";
import { LabelArray } from "./../core/model/notes";

@Component({
    selector: "app-fundoo-notes",
    templateUrl: "./fundoo-notes.component.html",
    styleUrls: ["./fundoo-notes.component.css"]
})
export class FundooNotesComponent {
    /**
     * iserror - To check any HTTP error.
     */
    iserror: boolean;
    /**
     * Stores HTTp error messages
     */
    errorMessage: any;
    base64textString: string;
    myurl: string;
    ispresent: boolean;

    constructor(
        private commonService: CommonService,
        private router: Router,
        public dialog: MatDialog,
        public cookie: CookieService,
        public createlabels: CreatelabelsService,
        public iservice: NotesService
    ) {}

    /**
     * @enable - Enables list or grid images.
     */
    enable = false;
    email: any;
    obs: any;
    /**
     * @url - profilepic image url
     */

    searchItem: any;
    /**
     * Model declaration
     */
    allLabels: LabelArray[] = [];
    ngOnInit() {
        let email = this.cookie.get("key");
        let obs = this.createlabels.get_all_labels(email);
        obs.subscribe(
            (status: any) => {
                this.allLabels = status;
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );

        let obss = this.iservice.fetchProfile(email);
        obss.subscribe((res: any) => {
            if (res != "") {
                this.myurl = "data:image/jpeg;base64," + res;
            } else {
                this.myurl = this.cookie.get("imageurl");
            }
        });
        let observer = this.iservice.fetchUserData();
        observer.subscribe((res: any) => {
            this.email = res.email;
        });
    }

    /**
     * @method onClick()
     * @description - Selects list view or grid view.
     */
    onClick() {
        this.enable = !this.enable;
        this.commonService.enableGrid(this.enable);
    }
    /**
     * @method logout()
     * @description - this method navigate to login page and clears the token.
     */
    logout() {
        localStorage.removeItem("token");
        this.cookie.remove("key");
        this.cookie.remove("imageurl");
        this.router.navigate(["/login"]);
    }
    /**
     * @method openDialog()
     * @description - this method open labels component and sends allLabels data.
     *
     */
    openDialog() {
        const dialogref = this.dialog.open(LabelsComponent, {
            width: "350px",
            data: this.allLabels
        });
        dialogref.afterClosed().subscribe(result => {
            if (result != null || result != undefined) this.allLabels = result;
        });
    }
    /**
     * @method selectedLabel
     * @param label
     * @description - sends selected label to selectedLabel() for displaying the labelled notes
     */
    selectedLabel(label) {
        this.commonService.selectedLabel(label);
    }
    /**
     * @method onSelectFile()
     * @return void
     * @description Function to upload profile pic
     */
    onSelectFile(event) {
        var files = event.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            debugger;
            reader.onload = this._handleReaderLoaded.bind(this);
            debugger;
            reader.readAsBinaryString(file);
        }
    }

    _handleReaderLoaded(readerEvt) {
        debugger;
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);

        let email = this.cookie.get("key");
        let obss = this.iservice.saveProfile(this.base64textString, email);
        obss.subscribe((res: any) => {
            if (res != "") {
                this.ispresent = true;
                this.myurl = "data:image/jpeg;base64," + res;
            } else {
                if (
                    this.cookie.get("imageurl") != "" ||
                    this.cookie.get("imageurl") != null
                ) {
                    this.myurl = this.cookie.get("imageurl");
                }
            }
        });
    }
    search(searchItem) {
        this.commonService.searchItem(searchItem);
    }
    clearSearch() {
        this.searchItem = "";
        this.commonService.searchItem(this.searchItem);
    }
}
