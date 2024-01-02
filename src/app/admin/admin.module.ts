import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AdminGuard } from './guards/admin.guard';



@NgModule({
  declarations: [
    UsersComponent
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
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]),
  ]
})
export class AdminModule { }
