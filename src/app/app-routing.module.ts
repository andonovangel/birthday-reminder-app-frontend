import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome.component';
import { BirthdayModule } from './birthday/birthday.module';
import { RedirectGuard } from './auth/redirect.guard';
import { UserProfileModule } from './user-profile/user-profile.module';

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
    path: 'register', 
    canActivate: [RedirectGuard],
    component: RegisterComponent 
  }, 
  { 
    path: 'login', 
    canActivate: [RedirectGuard],
    component: LoginComponent 
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UserProfileModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
