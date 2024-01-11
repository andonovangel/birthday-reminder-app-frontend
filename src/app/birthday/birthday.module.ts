import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BirthdayListComponent } from './birthday-list/birthday-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BirthdayDetailComponent } from './birthday-detail/birthday-detail.component';
import { AuthGuard } from '../guards/auth.guard';
import { BirthdayCreateComponent } from './birthday-create/birthday-create.component';
import { BirthdayEditComponent } from './birthday-edit/birthday-edit.component';
import { BirthdayArchivedComponent } from './birthday-archived/birthday-archived.component';
import { IsGroupValidGuard } from '../guards/is-group-valid.guard';

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
        path: 'archived',
        canActivate: [AuthGuard],
        component: BirthdayArchivedComponent,
      },
      { 
        path: ':id', 
        canActivate: [IsGroupValidGuard, AuthGuard],
        component: BirthdayListComponent,
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
