import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from "../../../models/company.model";
import {NotificationsService} from "angular2-notifications";
import {CompanyService} from "../../../services/company.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";





@Component({
  templateUrl: 'add-company.component.html'
})
export class AddCompanyComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  company: CompanyModel = new CompanyModel();
  companyList: CompanyModel[] = [];

  constructor(
    private companyService: CompanyService,
    private notificationService: NotificationsService,
    private http: HttpClient
  ){

  }

  ngOnInit() {
    // this.getCompany();

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost:8080/api/company/view?key=',
            dataTablesParameters, {}
          ).subscribe(resp => {
          that.companyList = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [{ data: 'name' }, { data: 'representative' }, { data: 'contactNo' }, { data: 'note' }]
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

  saveNewCompany(){
    this.companyService.saveCompany(this.company).subscribe((res)=>{
      if(res.success == true){
        this.notificationService.success('Success', res.message);
        this.rerender();
        this.company = new CompanyModel;
      }
    });
  }
}

