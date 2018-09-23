import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'models/user';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers :[ChatService]
})

export class ProfileComponent implements OnInit {
  user:Object;
 
  //chat_input: any;
  constructor(private authService: AuthService, private router: Router, public chatService: ChatService, public http: HttpClient) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user=profile.user;
    // return this.http.get(this.baseURL);
      this.chatService.getUsersList();
    }, err =>{
      console.log(err);
      return false;
    });
   // return this.getUserList();
    //return this.http.get(this.baseURL);
  //  this.authService.loadToken
    //sthis.clearForm();
    //.map((response:Response)=>response.json());


  }


  }