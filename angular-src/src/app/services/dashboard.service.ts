import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";




@Injectable()
export class DashboardService {


  constructor(private http: Http) { }


  chartData(dates){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/dashboard/area-chart-data', dates, {headers: headers})
      .map(res => res.json());
  }

  getSalesTotal(todayDate){
    return this.http.get('http://localhost:8080/api/dashboard/sales/totalValue?todayDate='+todayDate)
      .map(res => res.json());
  }

  getSalesItems(todayDate){
    return this.http.get('http://localhost:8080/api/dashboard/sales/totalItem?todayDate='+todayDate)
      .map(res => res.json());
  }

  getPurchaseTotal(todayDate){
    return this.http.get('http://localhost:8080/api/dashboard/purchase/totalValue?todayDate='+todayDate)
      .map(res => res.json());
  }

  getPurchaseItems(todayDate){
    return this.http.get('http://localhost:8080/api/dashboard/purchase/totalItem?todayDate='+todayDate)
      .map(res => res.json());
  }






}
