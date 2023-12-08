import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { RouterModule } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth.guard';
import { ForgetPasswordComponent } from './password-forget/forget-password.component';
import { ResetPasswordComponent } from './password-reset/reset-password.component';
import { ChangePasswordComponent } from './password-change/change-password.component';



@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileEditComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
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
      { 
        path: 'password-forget',
        component: ForgetPasswordComponent,
      },
      { 
        path: 'password-reset/:token',
        component: ResetPasswordComponent,
      },
      { 
        path: 'password-change',
        component: ChangePasswordComponent,
      },
    ])
  ]
})
export class UserProfileModule { }
