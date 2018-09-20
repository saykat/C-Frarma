import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from "../../../models/company.model";
import {NotificationsService} from "angular2-notifications";
import {CompanyService} from "../../../services/company.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";
import {NgxSmartModalService} from "ngx-smart-modal";





@Component({
  templateUrl: 'add-company.component.html'
})
export class AddCompanyComponent implements OnInit {

  @ViewChild(DataTableDirective)  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  company: CompanyModel = new CompanyModel();
  companyList: CompanyModel[] = [];
  viewCompany: CompanyModel = new CompanyModel();
  create = true;

  constructor(
    private companyService: CompanyService,
    private notificationService: NotificationsService,
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService
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

  saveNewCompany(){
    this.company.status = 1;
    this.companyService.saveCompany(this.company).subscribe((res)=>{
      if(res.success == true){
        this.notificationService.success('Success', res.message);
        this.rerender();
        this.company = new CompanyModel;
      }
    });
  }

  setView(index){
    this.viewCompany = this.companyList[index];
    this.ngxSmartModalService.getModal('viewModal').open();
  }

  setEdit(index){
    this.company = this.companyList[index];
    this.create = false;
  }

  setOperation(){
    if(this.create == false){
      this.create = true;
      this.company = new CompanyModel;
    }else{
      this.create = false;
      setTimeout(()=>{
        this.create = true;
        this.notificationService.warn("Warning", "No record selected");
      },500)
    }
  }

  setDelete(index){
    this.company = this.companyList[index];
    this.ngxSmartModalService.getModal('deleteConfirmationModal').open();
  }

  deleteRecord(){
    this.company.status = 0;

    this.companyService.saveCompany(this.company).subscribe((res)=>{
      if(res.success == true){
        this.rerender();
        this.company = new CompanyModel;

        this.ngxSmartModalService.getModal('deleteConfirmationModal').close();
        this.notificationService.success('Success', 'A record successfully deleted');
      }else{
        this.notificationService.error('Error', 'Please try again');
      }
    });

  }


}

