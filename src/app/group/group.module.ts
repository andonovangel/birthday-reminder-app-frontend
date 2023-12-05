import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GroupArchivedComponent } from './group-archived/group-archived.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { AuthGuard } from '../auth/auth.guard';



@NgModule({
  declarations: [
    GroupListComponent,
    GroupArchivedComponent,
    GroupCreateComponent,
    GroupEditComponent,
    GroupDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'list',
        canActivate: [AuthGuard],
        component: GroupListComponent,
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: GroupCreateComponent,
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: GroupEditComponent,
      },
      {
        path: 'group/:id',
        canActivate: [AuthGuard],
        component: GroupDetailComponent,
      },
      {
        path: 'archived',
        canActivate: [AuthGuard],
        component: GroupArchivedComponent,
      },
    ])
  ]
})
export class GroupModule { }
