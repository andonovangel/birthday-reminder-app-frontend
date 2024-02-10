import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private getUsersUrl = 'http://localhost:8000/api/admin/users' 
  private editRolesUrl = 'http://localhost:8000/api/admin/users/' 
  
  private roles: string[] = ['Admin', 'User']

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.getUsersUrl, {withCredentials: true})
  }

  editRole(data: any, id?: number) {
    return this.http.put<any>(this.editRolesUrl + id, data, {withCredentials: true})
  }

  getUserRoles(): string[] {
    return this.roles
  }
}
