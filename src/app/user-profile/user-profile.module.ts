import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { RouterModule } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard';



@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { 
        path: 'profile',
        component: ProfileDetailComponent,
        canActivate: [AuthGuard],
      },
      { 
        path: 'profile-edit',
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
    ])
  ]
})
export class UserProfileModule { }
