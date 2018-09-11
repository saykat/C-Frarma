
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {CartService} from "./cart.service";

@Injectable()
export class SalesService{

  constructor(private http: Http, private cartService: CartService) { }

  newSale(){
    let headers = new  Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/sale/save', this.cartService, {headers: headers})
      .map(res=>res.json());
  }

}
