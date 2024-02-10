import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { IUser } from 'src/app/user-profile/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public pageTitle: string = 'Users'
  public errorMessage: string = ''
  private getUsersSub?: Subscription

  public filteredUsers: IUser[] = []
  private users: IUser[] = []
  private _listFilter: string = ''

  constructor(private adminService: AdminService) {}
    
  get listFilter(): string {
    return this._listFilter
  }

  set listFilter(value: string) {
    this._listFilter = value
    console.log('In setter: ', value)
    this.filteredUsers = this.performFilter(value)
  }

  ngOnInit(): void {
    this.getUsersSub = this.getUsers()
  }
  
  ngOnDestroy(): void {
    this.getUsersSub?.unsubscribe()
  }
    
  performFilter(filterBy: string): IUser[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.users.filter((user: IUser) =>
      user.name.toLocaleLowerCase().includes(filterBy)
    )
  }

  getUsers() {
    return this.adminService.getUsers().subscribe({
      next: response => {
        this.users = response
        this.filteredUsers = this.users
      },
      error: err => {
        this.errorMessage = err
      }
    })
  }
}
