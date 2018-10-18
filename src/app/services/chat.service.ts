import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as socketio from 'socket.io-client';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class ChatService {


  //initialized URI to for the user controller
  readonly baseURL = 'https://chatty.localtunnel.me/api/';
  message: any 
  userData: any = {};
  constructor(private http: HttpClient) {}

  getUsersList(){
    return this.http.get(this.baseURL + 'users');
  }

  getUserInfo(username){
    const url = this.baseURL+'users/'+username;
    return this.http.get(url);
  }

  //post request for message to db from http client 
  postMessage(message:any){
    return this.http.post(this.baseURL + 'messages', message);
  }

  //get messages between two users from db
  getMessages(user1,user2){
    return this.http.post(this.baseURL + 'messages/getMessages', {user1, user2});

  }
  
}
