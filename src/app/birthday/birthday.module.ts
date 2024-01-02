import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BirthdayListComponent } from './birthday-list/birthday-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BirthdayDetailComponent } from './birthday-detail/birthday-detail.component';
import { BirthdayDetailGuard } from './birthday-detail/birthday-detail.guard';
import { AuthGuard } from '../auth/auth.guard';
import { BirthdayCreateComponent } from './birthday-create/birthday-create.component';
import { BirthdayEditComponent } from './birthday-edit/birthday-edit.component';
import { BirthdayArchivedComponent } from './birthday-archived/birthday-archived.component';

@NgModule({
  declarations: [
    BirthdayListComponent,
    BirthdayDetailComponent,
    BirthdayCreateComponent,
    BirthdayEditComponent,
    BirthdayArchivedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { 
        path: 'list',
        canActivate: [AuthGuard],
        component: BirthdayListComponent,
      },
      { 
        path: 'create',
        canActivate: [AuthGuard],
        component: BirthdayCreateComponent,
      },
      { 
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: BirthdayEditComponent,
      },
      { 
        path: 'birthday/:id', 
        canActivate: [BirthdayDetailGuard, AuthGuard],
        component: BirthdayDetailComponent,
      },
      { 
        path: 'archived',
        canActivate: [AuthGuard],
        component: BirthdayArchivedComponent,
      },
      { 
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ])
  ]
})
export class BirthdayModule { }
