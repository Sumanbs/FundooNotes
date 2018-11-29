import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../Services/data.service";

@Component({
  selector: "app-activate-account",
  templateUrl: "./activate-account.component.html",
  styleUrls: ["./activate-account.component.css"]
})
export class ActivateAccountComponent implements OnInit {
  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {}
  public token;
  public emailid;
  public error;
  public iserror;
  public option = "activation";
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token = params["token"];
    });
    let obs = this.data.sendtoken(this.token, this.option);
    obs.subscribe((response: any) => {
      if (response.status == 200) alert("Activation successful");
      else if (response.status == 500) {
        alert("Activation Not successful");
      }
    });
  }
}
