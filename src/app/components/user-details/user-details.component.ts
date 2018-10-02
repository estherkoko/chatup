import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

declare var M: any;
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})


export class UserDetailsComponent implements OnInit {

  username: any;
  user: any;
  messages: any;
  loggedInUser: any;
  receiver: String;
  sender: String;
  content: String;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, 
    private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.getUserInformation(this.username);
    //this.retrieveMessages();
    
    //get logged in user information
    
    this.authService.getProfile().subscribe(loggedUser =>{
      this.loggedInUser=loggedUser.user;
    });
  }


  getUserInformation(username) {
    this.chatService.getUserInfo(username).subscribe(data => {
      this.user = data;
    });
  }

  onMessageSubmit(form: NgForm){
    const m ={
      sender: this.loggedInUser._id,
      receiver: this.user._id,
      content: this.content
    }
    this.sendMessage(m);
    this.content = '';
    this.retrieveMessages();
  }

  sendMessage(message){    
   // send message details to db and route to current user
    this.chatService.postMessage(message).subscribe((result) => {
      console.log('Message Sent Successfully:', message);
    }, (err) => {
      console.log(err);
    });
  }

  retrieveMessages(){
    //access chat service to retrieve the information;
    this.chatService.getMessages(this.loggedInUser._id, this.user._id).subscribe((result) => {
      this.messages = result;
    }, (err) => {
      console.log(err);
    });
  }

}