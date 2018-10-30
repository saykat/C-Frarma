


import {Component, OnInit, ViewChild} from "@angular/core";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {NotificationsService} from "angular2-notifications";
import {HttpClient} from "@angular/common/http";
import {NgxSmartModalService} from "ngx-smart-modal";
import {SaleModel} from "../../../models/saleModel";
import {SalesService} from "../../../services/sales.service";

@Component({
  templateUrl: 'purchase-report.component.html'
})
export class PurchaseReportComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  salesList: SaleModel[] = [];
  viewSale: SaleModel = new SaleModel();
  details: boolean = false;
  constructor(
    private notificationService: NotificationsService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    private salesService: SalesService,
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
          that.salesList = resp.data;

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
    this.viewSale = this.salesList[index];
    this.details = true;
  }

  backToList(){
    this.viewSale = new SaleModel();
    this.details = false;

  }

  setDelete(index){
    this.viewSale = this.salesList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }


  deleteRecord() {
    this.viewSale.status = 0;

    this.salesService.returnSale(this.viewSale).subscribe((res) => {
      if (res.success == true) {
        this.rerender();
        this.viewSale = new SaleModel();

        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
      } else {
        this.notificationService.error('Error', 'Please try again');
      }
    });
  }


}

