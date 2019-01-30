import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ChatService]
})
export class UsersComponent implements OnInit {

  users: any;
  searchText:string;
  p:number = 1;
  loggedInUser : boolean;
  constructor(private chatService: ChatService, private httpClient: HttpClient, private authService: AuthService)
 { }

  ngOnInit() {
    this.chatService.getUsersList().subscribe((response) => {
      this.users = response;
      
    });
    
    this.authService.getProfile().subscribe(loggedUser => {
      this.loggedInUser = loggedUser.user;
      if(loggedUser!==''){
        this.loggedInUser=true;
      }
      else{
        this.loggedInUser=false;
      }

    });
  }
}
