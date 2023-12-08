import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private updateUserUrl = 'http://localhost:8000/api/user-update'
  private sendResetPasswordEmailUrl = 'http://localhost:8000/api/password-reset'
  private resetPasswordUrl = 'http://localhost:8000/api/password-reset/'
  private changePasswordUrl = 'http://localhost:8000/api/password-change'

  constructor(private http: HttpClient) {}

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
