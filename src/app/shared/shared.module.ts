import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from '../options/options.component';
import { ClickOutsideDirective } from '../click-outside.directive';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OptionsComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    OptionsComponent,
    ClickOutsideDirective,
  ]
})
export class SharedModule { }
