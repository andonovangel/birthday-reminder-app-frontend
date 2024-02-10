import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AdminGuard } from '../guards/admin.guard';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';



@NgModule({
  declarations: [
    UsersComponent,
    AdminEditUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'edit/:id',
        component: AdminEditUserComponent,
        canActivate: [AdminGuard]
      },
      { 
        path: '**',
        redirectTo: 'users',
        pathMatch: 'full'
      }
    ]),
  ]
})
export class AdminModule { }
