import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatservice';
  fullname:string;
  username : any;
  password : any;
  email    : any;
  created_date : any;


}
