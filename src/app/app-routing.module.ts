import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome.component';
import { BirthdayModule } from './birthday/birthday.module';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BirthdayModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
