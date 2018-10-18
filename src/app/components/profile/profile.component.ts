import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers :[ChatService]
})

export class ProfileComponent implements OnInit {
  user:Object;
  constructor(private authService: AuthService, private router: Router, public chatService: ChatService, public http: HttpClient) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user=profile.user;
  
    }, err =>{
      console.log(err);
      return false;
    });

  }


  }