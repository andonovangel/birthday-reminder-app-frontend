import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserFromApi().subscribe({
      next: () => {
        window.isAuthenticated = true;
      },
      error: (error) => {
        if (error && error.response && error.response.status && error.response.status == 401) {
          window.isAuthenticated = false;
        }
      }
    })
  }

  getAuthService() {
    return this.authService
  }
}
