import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private updateUserUrl = 'http://localhost:8000/api/user-update/'

  constructor(private http: HttpClient) {}

  updateUser(user: any) {
    return this.http.put<any>(this.updateUserUrl, user, { withCredentials: true })
  }
}
