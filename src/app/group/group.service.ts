import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup } from './group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private listGroupsUrl = 'http://localhost:8000/api/groups'

  constructor(private http: HttpClient) {}

  getGroups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(this.listGroupsUrl, { withCredentials: true })
  }
}
