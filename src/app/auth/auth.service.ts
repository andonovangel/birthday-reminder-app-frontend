import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Subscription, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  private currentUserSubject = new BehaviorSubject<any>({})

  private registerUrl = "http://localhost:8000/api/register"
  private loginUrl = "http://localhost:8000/api/login"
  private logoutUrl = "http://localhost:8000/api/logout"

  getUserFromApiSub?: Subscription
  logoutUserSub?: Subscription

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
  }
  
  ngOnDestroy(): void {
    this.getUserFromApiSub?.unsubscribe()
    this.logoutUserSub?.unsubscribe()
  }

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
    this.http.get<any>('http://localhost:8000/api/csrf-cookie')
    

    return this.http.post<any>(this.loginUrl, user, {withCredentials: true}).pipe(
      map(userInfo => {
        localStorage.setItem('token', userInfo.token);
        // localStorage.setItem('user', JSON.stringify(userInfo.user));
        // this.setCurrentUser(JSON.parse(localStorage.getItem('user') || '{}'))

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
            this.currentUserSubject.next({})
            this.router.navigate(['/welcome'], { relativeTo: this.route })
        },
        error: err => {
            console.error('Logout failed:', err)
        }
    })  
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getCurrentUser(): Observable<any | null> {
    this.getUserFromApiSub = this.getUserFromApi().subscribe({
      next: (user: any) => {
        this.setCurrentUser(JSON.parse(JSON.stringify(user) || '{}'))
      },
      error: (err: any) => {
        console.log(err)
      }
    })
    return this.currentUserSubject.asObservable()
  }

  setCurrentUser(data: any) {
    this.currentUserSubject.next(data);
  }

  getUserFromApi(): Observable<any> {
    return  this.http.get<any>("http://localhost:8000/api/user")
  }
}
