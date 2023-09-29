import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BirthdayListComponent } from './birthday-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BirthdayListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'birthdays', component: BirthdayListComponent },
      // { 
      //   path: 'products/:id', 
      //   canActivate: [ProductDetailGuard],
      //   component: ProductDetailComponent 
      // }
    ])
  ]
})
export class BirthdayModule { }
