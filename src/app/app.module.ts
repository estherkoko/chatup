import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

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
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatService } from './services/chat.service';
import { FilterPipe } from './filter.pipe';

const appRoutes : Routes =[
  {
    path:'', 
    component: HomeComponent
  },
  {
    path:'login', 
    component: LoginComponent
  },
  {
    path:'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard]},
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'user', 
    component: UsersComponent,
    children: [
      {
        path: 'livechat/:username',
        component: UserDetailsComponent
      }
    ]
  },
 


]

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('id_token');
    },
    whitelistedDomains: ['dry-ocean-45757.herokuapp.com']
  }
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    UserDetailsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    FormsModule,
    CommonModule,
    FlashMessagesModule.forRoot(),
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
      JwtModule.forRoot({
                jwtOptionsProvider: {
                  provide: JWT_OPTIONS,
                  useFactory: jwtOptionsFactory
                }
              }),
  ],
  providers: [ValidateService, AuthService, ChatService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
