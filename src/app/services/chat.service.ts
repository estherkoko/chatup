import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ChatService {


  //initialized URI to for the user controller
  readonly baseURL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsersList(){
    return this.http.get(this.baseURL);
  }

  getUserInfo(username){
    const url = this.baseURL+'/'+username;
    return this.http.get(url);
  }

  //post request for message to db from http client 
  postMessage(message){
      return this.http.post(this.baseURL, message);

  }
}
