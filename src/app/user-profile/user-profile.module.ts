import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';



@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: 'profile',
        component: ProfileDetailComponent,
      },
      { 
        path: 'profile-edit',
        component: ProfileEditComponent,
      },
    ])
  ]
})
export class UserProfileModule { }
