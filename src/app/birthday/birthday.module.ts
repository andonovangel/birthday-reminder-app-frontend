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
import { IsIdValidGuard } from '../guards/is-id-valid.guard';
import { SharedModule } from '../shared/shared.module';
import { BirthdayListItemComponent } from './birthday-list/birthday-list-item/birthday-list-item.component';

@NgModule({
  declarations: [
    BirthdayListComponent,
    BirthdayDetailComponent,
    BirthdayCreateComponent,
    BirthdayEditComponent,
    BirthdayArchivedComponent,
    BirthdayListItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { 
        path: 'list',
        canActivate: [AuthGuard],
        component: BirthdayListComponent,
      },
      { 
        path: 'list/:id',
        canActivate: [IsIdValidGuard, AuthGuard],
        component: BirthdayListComponent,
      },
      { 
        path: 'create',
        canActivate: [AuthGuard],
        component: BirthdayCreateComponent,
      },
      { 
        path: 'edit/:id',
        canActivate: [AuthGuard, IsIdValidGuard],
        component: BirthdayEditComponent,
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
