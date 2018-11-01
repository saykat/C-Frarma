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






}
