
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {CartService} from "./cart.service";
import {PurchaseCartService} from "./purchase.cart.service";

@Injectable()
export class PurchaseService{

  constructor(private http: Http, private cartService: PurchaseCartService) { }

  newPurchase(){
    let headers = new  Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/purchase/save', this.cartService, {headers: headers})
      .map(res=>res.json());
  }

  returnPurchase(data){
    let headers = new  Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/purchase/modify', data, {headers: headers})
      .map(res=>res.json());
  }

}
