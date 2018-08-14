import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";



@Injectable()
export class MedicineService{


  constructor(private http: Http) { }

  viewMedicines(data = '0'){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:8080/api/medicine/view?key='+data, {headers: headers})
      .map(res => res.json());

  }


}
