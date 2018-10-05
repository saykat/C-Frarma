


import {Component, OnInit, ViewChild} from "@angular/core";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {NotificationsService} from "angular2-notifications";
import {HttpClient} from "@angular/common/http";
import {NgxSmartModalService} from "ngx-smart-modal";

@Component({
  templateUrl: 'purchase-report.component.html'
})
export class PurchaseReportComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();


  create = true;

  constructor(
    private notificationService: NotificationsService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService
  ){

  }

  ngOnInit() {

  }


}

