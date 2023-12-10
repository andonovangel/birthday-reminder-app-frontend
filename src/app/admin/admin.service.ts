import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private getUsersUrl = 'http://localhost:8000/api/users' 

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.getUsersUrl, {withCredentials: true})
  }
}
