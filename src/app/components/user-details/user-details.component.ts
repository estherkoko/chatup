import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { send } from '../../../../node_modules/@types/q';

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
  receiver_id: String;
  sender_id: String;
  sender_name: String;
  receiver_name: String;
  content: String;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, 
    private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(){
   
    this.username = this.route.snapshot.params['username'];
    this.getUserInformation(this.username);
    
    //get logged in user information and retrieve messages once page loads
      this.authService.getProfile().subscribe(loggedUser =>{
      this.loggedInUser=loggedUser.user;
      this.retrieveMessages();
    });
  }


  getUserInformation(username) {
    this.chatService.getUserInfo(username).subscribe(data => {
      this.user = data;
      
    });
  }

  onMessageSubmit(form: NgForm){
    const m ={
      sender_id: this.loggedInUser._id,
      receiver_id: this.user._id,
      content: this.content,
      sender_name :this.loggedInUser.username,
      receiver_name: this.user.username
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