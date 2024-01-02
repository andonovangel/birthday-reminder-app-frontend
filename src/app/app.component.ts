import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile/user-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  pageTitle = 'Birthday Reminder';

  constructor(
    private auth: AuthService,
    private userService: UserProfileService,
    private router: Router
  ) {}

  getUserRole() {
    return window.userData.role
  }

  getAuthService() {
    return this.auth
  }
}
