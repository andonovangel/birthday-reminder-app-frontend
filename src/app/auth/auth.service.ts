import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private registerUrl = "http://localhost:8000/api/register"
  private loginUrl = "http://localhost:8000/api/login"
  private logoutUrl = "http://localhost:8000/api/logout"

  private logoutUserSub?: Subscription

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}
  
  ngOnDestroy(): void {
    this.logoutUserSub?.unsubscribe()
  }

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user).pipe(
      map(userInfo => {
        localStorage.setItem('token', userInfo.token)

        return userInfo.user;
      })
    )
  }

   loginUser(user: any) {
    this.http.get<any>('http://localhost:8000/api/csrf-cookie')
    
    return this.http.post<any>(this.loginUrl, user, {withCredentials: true}).pipe(
      map(userInfo => {
        localStorage.setItem('token', userInfo.token)

        return userInfo.user;
      })
    )
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    this.logoutUserSub = this.http.post<any>(this.logoutUrl, {withCredentials: true}).subscribe({
        next: () => {
            localStorage.clear()
            this.router.navigate(['/login'], { relativeTo: this.route })
        },
        error: err => {
            console.error('Logout failed:', err)
        }
    })  
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUserFromApi(): Observable<any> {
    return this.http.get<any>("http://localhost:8000/api/user")
  }
}
