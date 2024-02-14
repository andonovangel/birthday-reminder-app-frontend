import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome.component';
import { RedirectGuard } from './guards/redirect.guard';
import { ErrorComponent } from './error/error.component';
import { ForgetPasswordComponent } from './password/password-forget/forget-password.component';
import { ResetPasswordComponent } from './password/password-reset/reset-password.component';

const routes: Routes = [
  { 
    path: 'welcome',
    component: WelcomeComponent 
  },
  { 
    path: 'birthdays',
    loadChildren: () =>
      import('./birthday/birthday.module').then((b) => b.BirthdayModule),
  },
  { 
    path: 'groups',
    loadChildren: () =>
      import('./group/group.module').then((b) => b.GroupModule),
  },
  { 
    path: 'profile',
    loadChildren: () =>
      import('./user-profile/user-profile.module').then((b) => b.UserProfileModule),
  },
  { 
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((b) => b.AdminModule),
  },
  { 
    path: 'register', 
    canActivate: [RedirectGuard],
    component: RegisterComponent 
  }, 
  { 
    path: 'login', 
    canActivate: [RedirectGuard],
    component: LoginComponent 
  },
  { 
    path: 'password-forget',
    canActivate: [RedirectGuard],
    component: ForgetPasswordComponent,
  },
  { 
    path: 'password-reset/:token',
    canActivate: [RedirectGuard],
    component: ResetPasswordComponent,
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
