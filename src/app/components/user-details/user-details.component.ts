import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  username: any;
  user: any;
  loggedInUser: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.getUserInformation(this.username);

    this.authService.getProfile().subscribe(loggedUser =>{
      this.loggedInUser=loggedUser.user;});
  }

  getUserInformation(username) {
    this.chatService.getUserInfo(username).subscribe(data => {
      this.user = data;
    })
  }

    


}
