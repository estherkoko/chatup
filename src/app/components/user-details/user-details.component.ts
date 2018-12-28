import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import * as socketio from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


declare var M: any;
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
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
  created_date: Date;
  private socket;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,
    private chatService: ChatService, private authService: AuthService) {
    this.socket = socketio('http://localhost:3000');
    this.created_date = new Date();
    

  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      //get logged in user information and retrieve messages once page loads  
      this.username = this.route.snapshot.params['username'];
      this.getUserInformation(this.username);

      this.authService.getProfile().subscribe(loggedUser => {
        this.loggedInUser = loggedUser.user;
        this.retrieveMessages();
        //push message from server to client
        this.getM()
          .subscribe((message: string) => {
            this.messages.push(message);

          });
      });
    });



  }



  public getM = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);

      });

    });
  }
  getUserInformation(username) {
    this.chatService.getUserInfo(username).subscribe(data => {
      this.user = data;

    });
  }

  onMessageSubmit(form: NgForm) {
    const m = {
      sender_id: this.loggedInUser._id,
      receiver_id: this.user._id,
      content: this.content,
      sender_name: this.loggedInUser.username,
      receiver_name: this.user.username,
      created_date: this.created_date
    }

    this.sendMessage(m);
    this.content = '';
  }

  sendMessage(message) {
    // send message details to db and route to current user
    // emit message in real time to user
    this.chatService.postMessage(message).subscribe();
    this.socket.emit('new-message', message);
  }

  retrieveMessages() {
    //access chat service to retrieve the information;

    this.chatService.getMessages(this.loggedInUser._id, this.user._id).subscribe((result) => {
      this.messages = result;
    }, (err) => {
      console.log(err);
    });
  }

}