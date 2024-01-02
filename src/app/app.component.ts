import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile/user-profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  pageTitle = 'Birthday Reminder';

  constructor(
    private auth: AuthService,
    private userService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.userService.getUser().subscribe({
    //   next: (response) => {
    //     console.log(response)
    //     window.userData = response
    //     window.isAuthenticated = true
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     if (error && error.status == 401) {
    //       window.isAuthenticated = false
    //     }
    //   }
    // })
  }

  getUserRole() {
    return window.userData.role
  }

  getAuthService() {
    return this.auth
  }
}
