import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, RoutesRecognized} from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


import { ValidateService} from './services/validate.service';
import { AuthService} from './services/auth.service';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './services/chat.service';

const appRoutes : Routes =[
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'user', component: UsersComponent},
  {path: 'userDetails', component: UserDetailsComponent}



]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule,
    HttpClientModule
    
  ],
  providers: [ValidateService, AuthService, ChatService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
