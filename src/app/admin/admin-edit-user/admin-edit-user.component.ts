import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { IUser } from 'src/app/user-profile/user';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.scss']
})
export class AdminEditUserComponent implements OnInit, OnDestroy {
  public user?: IUser
  public errorMessage: string = ''
  public formGroup!: FormGroup
  public userRoles = ['Admin', 'User'];

  private getUsersSub?: Subscription
  private editUsersSub?: Subscription

  constructor(
    private route: ActivatedRoute, 
    private admin: AdminService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.getUsersSub = this.admin.getUsers().subscribe({
      next: (users: IUser[]) => {
        this.user = users.find(x => x.id === id)

        this.createFormGroup()
      },
      error: err => this.errorMessage = err
    })
  }

  ngOnDestroy(): void {
    this.getUsersSub?.unsubscribe()
    this.editUsersSub?.unsubscribe()
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      role: new FormControl(this.user?.role, [
        Validators.required,
      ])
    })
  }

  onSubmit() {
    this.editUsersSub = this.admin.editRole(this.formGroup.value, this.user?.id).subscribe({
      next: () => {
        this.router.navigate(['/admin/users'])
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onBack(): void {
    this.router.navigate(['/admin/users'])
  }
}
