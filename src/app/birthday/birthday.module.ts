import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BirthdayListComponent } from './birthday-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BirthdayDetailComponent } from './birthday-detail/birthday-detail.component';
import { BirthdayDetailGuard } from './birthday-detail/birthday-detail.guard';

@NgModule({
  declarations: [
    BirthdayListComponent,
    BirthdayDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'birthdays', component: BirthdayListComponent },
      { 
        path: 'birthdays/:id', 
        canActivate: [BirthdayDetailGuard],
        component: BirthdayDetailComponent 
      }
    ])
  ]
})
export class BirthdayModule { }
