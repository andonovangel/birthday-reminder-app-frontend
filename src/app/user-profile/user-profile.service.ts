import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private getUserUrl = 'http://localhost:8000/api/user'
  private updateUserUrl = 'http://localhost:8000/api/user'
  private sendResetPasswordEmailUrl = 'http://localhost:8000/api/password-reset'
  private resetPasswordUrl = 'http://localhost:8000/api/password-reset/'
  private changePasswordUrl = 'http://localhost:8000/api/password-change'

  constructor(private http: HttpClient) {}

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(this.getUserUrl, { withCredentials: true })
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.updateUserUrl, user, { withCredentials: true })
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post<any>(this.sendResetPasswordEmailUrl, email, {})
  }
  
  resetPassword(password: string, token: string): Observable<any> {
    return this.http.post<any>(this.resetPasswordUrl + token, password, {})
  }
  
  changePassword(passwords: string[]): Observable<any> {
    return this.http.post<any>(this.changePasswordUrl, passwords, {withCredentials: true})
  }
}
