import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "http://127.0.0.1:8000/api/register"
  private loginUrl = "http://127.0.0.1:8000/api/login"
  private logoutUrl = "http://127.0.0.1:8000/api/logout"

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user) 
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    this.http.post<any>(this.logoutUrl, {}).subscribe({
        next: response => {
            localStorage.removeItem('token')
            this.router.navigate(['/welcome'])
        },
        error: error => {
            console.error('Logout failed:', error)
        }
    })  
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
