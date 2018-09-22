import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class ChatService {


  //initialized URI to for the user controller
  readonly baseURL = 'http://localhost:3000';
  private allUsers  = []; 
  selectedUser: any = {};

  constructor(private httpClient: HttpClient, private http:Http) { }

  getUsersList(){
    this.httpClient.get(this.baseURL + '/allUsers').subscribe((res : any[])=>{
    console.log(res);
    this.allUsers = res;
    });
}
}
