import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { IUser } from '../user-profile/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private registerUrl = 'http://localhost:8000/api/register'
  private loginUrl = 'http://localhost:8000/api/login'
  private logoutUrl = 'http://localhost:8000/api/logout'

  private logoutUserSub?: Subscription

  constructor(
    private http: HttpClient, 
    private router: Router,
  ) {}
  
  ngOnDestroy(): void {
    this.logoutUserSub?.unsubscribe()
  }

  registerUser(user: IUser) {
    return this.http.post<any>(this.registerUrl, user, {withCredentials: true}).pipe(
      map(userInfo => {
        window.isAuthenticated = true
        window.userData = userInfo.user
        return userInfo.user
      })
    )
  }

   loginUser(user: IUser) {
    return this.http.post<any>(this.loginUrl, user, {withCredentials: true}).pipe(
      map(userInfo => {
        window.isAuthenticated = true
        window.userData = userInfo.user
        return userInfo.user;
      })
    )
  }

  loggedIn() {
    return window.isAuthenticated || false;
  }

  logoutUser() {
    this.logoutUserSub = this.http.post<any>(this.logoutUrl, null, { withCredentials: true }).subscribe({
      next: () => {
        window.isAuthenticated = false
        this.router.navigate(['/login'])
      },
      error: err => {
          console.error('Logout failed:', err)
      }
    })
  }
}
