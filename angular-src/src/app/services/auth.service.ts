import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";
import { tokenNotExpired } from 'angular2-jwt';
import {environment} from "../../environments/environment";


@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http, private router: Router) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.local+'api/user/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.local+'api/user/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  loadToken(){
    const  token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);

    return this.http.get(environment.local+'api/user/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

}
