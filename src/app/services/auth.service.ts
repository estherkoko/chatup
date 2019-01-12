import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import  'rxjs/add/operator/map';//for observables
import { tokenNotExpired } from 'angular2-jwt';
//import { JwtHelper } from 'angular2-jwt';
//jwtHelper: JwtHelper = new JwtHelper();

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
    this.authToken = token;//token taken out of local storage
     
    
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }
  logout(){
    this.authToken = null;
    this. user = null;
    localStorage.clear();
    
  }
}
