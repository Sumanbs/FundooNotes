import { MatDialog } from "@angular/material";
import { CreatelabelsService } from "../Services/createlabels.service";
import { Router } from "@angular/router";
import { Component, inject } from "@angular/core";
import { NotesService } from "../Services/notes.service";
import { CommonService } from "../Services/list-grid.service";
import { LabelsComponent } from "../labels/labels.component";
import { CookieService } from "angular2-cookie";
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
     * @allLabels - stores the array of labels
     */
    allLabels: any;
    /**
     * @enable - Enables list or grid images.
     */
    enable = false;
    email = this.cookie.get("key");
    /**
     * @url - profilepic image url
     */
    url = "";
    searchItem: any;
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

        let obs1 = this.iservice.getImage(email);
        obs1.subscribe(
            (status: any) => {
                this.url = status.profilepic;
            },
            error => {
                this.iserror = true;
                this.errorMessage = error.message;
            }
        );
        let obss = this.iservice.fetchProfile(this.email);
        obss.subscribe((res: any) => {
            if (res != "") {
                this.ispresent = true;
                this.myurl = "data:image/jpeg;base64," + res;
                alert(this.myurl);
                console.log(this.myurl);
            } else {
                this.ispresent = false;
            }
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
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        // console.log(binaryString));
        // console.log(this.base64textString);
        let email = this.cookie.get("key");
        let obss = this.iservice.saveProfile(this.base64textString, email);
        obss.subscribe((res: any) => {
            if (res != "") {
                this.ispresent = true;
                this.myurl = "data:image/jpeg;base64," + res;
            } else {
                this.ispresent = false;
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
