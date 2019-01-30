import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import  'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';
<<<<<<< HEAD
import { tokenNotExpired } from 'angular2-jwt';
=======
>>>>>>> 9c16dafab8dc9cce9a88ed0a3e4a94c2fc7234a7

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  url: string ='https://dry-ocean-45757.herokuapp.com';
  
  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/api/users/register', user, {headers: headers})
      .map(res => res.json());

  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.url}/api/users/authenticate`, user, {headers: headers})
      .map(res => res.json());
  }
  
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.url}/api/users/profile`, {headers: headers})
      .map(res => res.json());
  }
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken=token;
    this.user = user;
  }

  //fetch token from local storage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
<<<<<<< HEAD
    //const helper = new JwtHelperService();
   // const isExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
    //return isExpired;
    return tokenNotExpired('id_token');
=======
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
      return isExpired;
>>>>>>> 9c16dafab8dc9cce9a88ed0a3e4a94c2fc7234a7
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    
  }
}
