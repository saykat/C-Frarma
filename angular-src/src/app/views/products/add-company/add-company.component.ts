import {Component, OnInit} from '@angular/core';
import {CompanyModel} from "../../../models/company.model";
import {NotificationsService} from "angular2-notifications";
import {MatSort, MatTableDataSource} from "@angular/material";
import {MatSortModule} from '@angular/material/sort';
import {CompanyService} from "../../../services/company.service";




@Component({
  templateUrl: 'add-company.component.html'
})
export class AddCompanyComponent implements OnInit {

  company: CompanyModel = new CompanyModel();
  companyList: CompanyModel[] = [];

  constructor(private companyService: CompanyService, private notificationService: NotificationsService){

  }

  ngOnInit() {
    this.getCompany();
  }


  getCompany() {
    this.companyService.viewCompany().subscribe((res)=> {
        this.companyList = res.data;
      });
  }
  saveNewCompany(){
    console.log(this.company)
    this.companyService.saveCompany(this.company).subscribe((res)=>{
      if(res.success == true){
        this.notificationService.success('Success', res.message);
        this.getCompany();
        this.company = new CompanyModel;
      }else{
        this.notificationService.alert('Failed', 'Something went wrong try again');
      }
    });
  }
}

