import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as socketio from 'socket.io-client';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class ChatService {


  //initialized URI to for the user controller
  readonly baseURL = 'https://chatty.localtunnel.me/api/';
  message: any;
  userData: any = {};
  private socket;
  constructor(private http: HttpClient) {//this.socket = socketio('http://localhost:3000');
}

  getUsersList(){
    return this.http.get(this.baseURL + 'users');
  }

  getUserInfo(username){
    const url = this.baseURL+'users/'+username;
    return this.http.get(url);
  }

  //post request for message to db from http client 
  postMessage(message:any){
    //this.socket.emit('new-message', this.http.post(this.baseURL + 'messages', message););
    return this.http.post(this.baseURL + 'messages', message);
  }

  //get messages between two users from db
  getMessages(user1,user2){
    return this.http.post(this.baseURL + 'messages/getMessages', {user1, user2});

  }
  
/*
  public sendMessage(m) {
   this.socket.on('connect',function(){
    //console.log("my name is socket");
   this.socket.emit('new-message', m);
  
  });  
}*/
}
