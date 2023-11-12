import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null)

  private registerUrl = "http://127.0.0.1:8000/api/register"
  private loginUrl = "http://127.0.0.1:8000/api/login"
  private logoutUrl = "http://127.0.0.1:8000/api/logout"

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user).pipe(
      map(userInfo => {
        localStorage.setItem('token', userInfo.token);
        localStorage.setItem('user', JSON.stringify(userInfo.user));
        this.setCurrentUser(JSON.parse(localStorage.getItem('user') || '{}'))

        return userInfo.user;
      })
    )
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user).pipe(
      map(userInfo => {
        localStorage.setItem('token', userInfo.token);
        localStorage.setItem('user', JSON.stringify(userInfo.user));
        this.setCurrentUser(JSON.parse(localStorage.getItem('user') || '{}'))

        return userInfo.user;
      })
    )
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    this.http.post<any>(this.logoutUrl, {}).subscribe({
        next: () => {
            localStorage.clear()
            this.currentUserSubject.next(EMPTY)
            this.router.navigate(['/welcome'])
        },
        error: err => {
            console.error('Logout failed:', err)
        }
    })  
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setCurrentUser(data: any) {
    let userData = data
    this.currentUserSubject.next(userData);
  }

  getCurrentUser(): Observable<any | null> {
    return this.currentUserSubject.asObservable()
  }
}
