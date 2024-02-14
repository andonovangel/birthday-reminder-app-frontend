import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { RouterModule } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../guards/auth.guard';
import { ForgetPasswordComponent } from '../password/password-forget/forget-password.component';
import { ResetPasswordComponent } from '../password/password-reset/reset-password.component';
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
        path: '',
        component: ProfileDetailComponent,
        canActivate: [AuthGuard],
      },
      { 
        path: 'edit',
        component: ProfileEditComponent,
        canActivate: [AuthGuard],
      },
      { 
        path: 'password-change',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      { 
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ]
})
export class UserProfileModule { }
