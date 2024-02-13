import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { IUser } from 'src/app/user-profile/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public pageTitle: string = 'Users'
  public errorMessage: string = ''
  private getUsersSub?: Subscription

  public filteredUsers: IUser[] = []
  private users: IUser[] = []
  private _listFilter: string = ''

  public userRoles: string[] = []

  constructor(private adminService: AdminService, private toastr: ToastrService) {}
    
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

  getUserRoles(user: IUser): string[] {
    this.userRoles = this.adminService.getUserRoles()
      .filter(role => role !== user.role)

    return this.userRoles
  }

  onUserRoleChange(user: IUser): void {
    this.adminService.editRole({ role: user.role }, user.id).subscribe({
      next: res => {
        console.log(res)
        this.toastr.success('User role is changed.', 'Success')
      },
      error: err => {
        console.log(err)
        this.toastr.error('Something went wrong.', 'Error', {
          timeOut: 3000,
        })
      }
    })
  }
}
