import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from '../options/options.component';
import { ClickOutsideDirective } from '../directives/click-outside.directive';
import { RouterModule } from '@angular/router';
import { AccountPillComponent } from '../account-pill/account-pill.component';



@NgModule({
  declarations: [
    OptionsComponent,
    ClickOutsideDirective,
    AccountPillComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    OptionsComponent,
    ClickOutsideDirective,
    AccountPillComponent,
  ]
})
export class SharedModule { }
