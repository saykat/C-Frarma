import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";



@Injectable()
export class MedicineService{


  constructor(private http: Http) { }

  viewMedicines(searchKey = '', groupKey = '', companyKey = ''){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:8080/api/medicine/view?key='+searchKey+ '&group=' + groupKey + '&company=' + companyKey, {headers: headers})
      .map(res => res.json());

  }


}
