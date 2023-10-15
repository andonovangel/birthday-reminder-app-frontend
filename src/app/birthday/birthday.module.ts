import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BirthdayListComponent } from './birthday-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BirthdayDetailComponent } from './birthday-detail/birthday-detail.component';
import { BirthdayDetailGuard } from './birthday-detail/birthday-detail.guard';
import { authGuard } from '../auth/auth.guard';
import { BirthdayCreateComponent } from './birthday-create/birthday-create.component';

@NgModule({
  declarations: [
    BirthdayListComponent,
    BirthdayDetailComponent,
    BirthdayCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { 
        path: 'birthdays',
        canActivate: [authGuard],
        component: BirthdayListComponent,
      },
      { 
        path: 'create-birthday',
        canActivate: [authGuard],
        component: BirthdayCreateComponent,
      },
      { 
        path: 'birthdays/:id', 
        canActivate: [BirthdayDetailGuard],
        component: BirthdayDetailComponent 
      }
    ])
  ]
})
export class BirthdayModule { }
