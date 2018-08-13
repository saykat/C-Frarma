import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()

export class ProductService {

  constructor(private http: Http) { }

  saveProduct(addProducts){
    let headers = new  Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/medicine/save', addProducts, {headers: headers})
      .map(res=>res.json());
  }

  viewAddProduct() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/medicine/view', {headers: headers})
      .map(res=>res.json());
  }
}
