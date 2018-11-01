


import {Component, OnInit, ViewChild} from "@angular/core";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {NotificationsService} from "angular2-notifications";
import {HttpClient} from "@angular/common/http";
import {NgxSmartModalService} from "ngx-smart-modal";
import {SaleModel} from "../../../models/saleModel";
import {SalesService} from "../../../services/sales.service";
import {PurchaseModel} from "../../../models/purchaseModel";
import {PurchaseService} from "../../../services/purchase.service";

@Component({
  templateUrl: 'purchase-report.component.html'
})
export class PurchaseReportComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  purchaseList: PurchaseModel[] = [];
  viewPurchase: PurchaseModel = new PurchaseModel();
  details: boolean = false;
  constructor(
    private notificationService: NotificationsService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    private purchaseService: PurchaseService,
  ){

  }

  ngOnInit() {

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost:8080/api/purchase/view?key=',
            dataTablesParameters, {}
          ).subscribe(resp => {
          that.purchaseList = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{},{ data: 'name' }, { data: 'representative' }, { data: 'contactNo' }, { data: 'note' },{}]
    };

  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  setView(index){
    this.viewPurchase = this.purchaseList[index];
    this.details = true;
  }

  backToList(){
    this.viewPurchase = new PurchaseModel();
    this.details = false;

  }

  setDelete(index){
    this.viewPurchase = this.purchaseList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }


  deleteRecord() {
    this.viewPurchase.status = 0;

    this.purchaseService.returnPurchase(this.viewPurchase).subscribe((res) => {
      if (res.success == true) {
        this.rerender();
        this.viewPurchase = new PurchaseModel();

        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
      } else {
        this.notificationService.error('Error', 'Please try again');
      }
    });
  }


}

