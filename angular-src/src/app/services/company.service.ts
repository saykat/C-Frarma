import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";




@Injectable()
export class CompanyService {


  constructor(private http: Http) { }


  saveCompany(company){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/company/save', company, {headers: headers})
      .map(res => res.json());
  }

  viewCompany(data = '') {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/company/view?key='+data, {headers: headers})
      .map(res=> res.json());
  }


  viewCompanyDataTable(data = '') {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/company/view?key='+data, {headers: headers})
      .map(res=> res.json());
  }




}
