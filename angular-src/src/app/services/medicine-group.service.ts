import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";




@Injectable()
export class MedicineGroupService {


  constructor(private http: Http) { }


  saveMedicineGroup(medicineGroup){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/medicine-group/save', medicineGroup, {headers: headers})
      .map(res => res.json());
  }

  viewMedicineGroup(data = '0'){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:8080/api/medicine-group/view?key='+data, {headers: headers})
      .map(res => res.json());

  }

}
