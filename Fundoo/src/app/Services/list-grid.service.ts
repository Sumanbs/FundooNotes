import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  constructor() {}
  private subject = new Subject<any>();
  private subjectforlabel = new Subject<any>();
  private subjectforSearch = new Subject<any>();
  /**
   * @method enableGrid
   * @param enableGrid boolean
   * This method receives the data from FUNDOO notes component .
   */
  enableGrid(enableGrid): any {
    this.subject.next(enableGrid);
  }
  /**
   * @method getSelectedLabel
   * This method makes subject as observable.
   */
  getData(): Observable<any> {
    return this.subject.asObservable();
  }
  /**
   * @method selectedLabel
   * @param label any
   * This method receives the selected label from FUNDOO notes component .
   */
  selectedLabel(label: any): any {
    this.subjectforlabel.next(label);
  }
  /**
   * @method getSelectedLabel
   * This method makes subjectforlabel as observable.
   */
  getSelectedLabel(): Observable<any> {
    return this.subjectforlabel.asObservable();
  }
  searchItem(searchItem: any): any {
    this.subjectforSearch.next(searchItem);
  }
  getsearchItem(): Observable<any> {
    return this.subjectforSearch.asObservable();
  }
}
