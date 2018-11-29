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
  fileToUpload: File = null;
  /**
   * @method select
   * @param files
   * @description - This method selects the profile pic file and sends it to service.
   */
  select(files: FileList) {
    debugger;
    let email = this.cookie.get("key");
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    let obs = this.iservice.takeimagefile(email, this.fileToUpload);
    obs.subscribe(
      (s: any) => {
        this.url = s.path;
      },
      error => {
        this.iserror = true;
        this.errorMessage = error.message;
      }
    );
  }
  search(searchItem) {
    this.commonService.searchItem(searchItem);
  }
  clearSearch() {
    this.searchItem = "";
    this.commonService.searchItem(this.searchItem);
  }
}
