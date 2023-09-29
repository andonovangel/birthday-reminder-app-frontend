import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BirthdayListComponent } from './birthday-list.component';

@NgModule({
  declarations: [

  ],
  imports: [
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
