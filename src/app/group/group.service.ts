import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup } from './group';
import { Observable } from 'rxjs';
import { IBirthday } from '../birthday/birthday';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private listGroupsUrl = 'http://localhost:8000/api/groups'
  private createGroupUrl = 'http://localhost:8000/api/groups'
  private editGroupUrl = 'http://localhost:8000/api/groups/'
  private deleteGroupUrl = 'http://localhost:8000/api/groups/'
  private listArchivedGroupsUrl = 'http://localhost:8000/api/archived-groups'
  private restoreGroupUrl = 'http://localhost:8000/api/restore-group/'
  private showGroupUrl = 'http://localhost:8000/api/groups/'

  constructor(private http: HttpClient) {}

  getGroups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(this.listGroupsUrl, { withCredentials: true })
  }

  createGroup(group: IGroup) {
      return this.http.post<IGroup>(this.createGroupUrl, group, { withCredentials: true })
  }
  
  editGroup(group: IGroup, id?: number) {
      return this.http.put<IGroup>(this.editGroupUrl + id, group, { withCredentials: true })
  }
  
  deleteGroup(group: IGroup) {
      return this.http.delete<IGroup>(this.deleteGroupUrl + group.id, { withCredentials: true })
  }

  getArchivedGroups(): Observable<IGroup[]> {
      return this.http.get<IGroup[]>(this.listArchivedGroupsUrl, { withCredentials: true })
  }
  
  restoreGroup(group: IGroup) {
      return this.http.post<IGroup>(this.restoreGroupUrl + group.id, group, { withCredentials: true })
  }
  
  getBirthdaysByGroup(id: number, params?: HttpParams) {
      return this.http.get<IBirthday[]>(this.showGroupUrl + id + '/birthdays', { 
        withCredentials: true,
        params: params
      })
  }
  
  getGroup(id: number) {
      return this.http.get<any>(this.showGroupUrl + id, { withCredentials: true })
  }
}
