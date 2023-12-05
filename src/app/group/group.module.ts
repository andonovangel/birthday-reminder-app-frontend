import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GroupArchivedComponent } from './group-archived/group-archived.component';
import { GroupCreateComponent } from './group-create/group-create.component';



@NgModule({
  declarations: [
    GroupListComponent,
    GroupArchivedComponent,
    GroupCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'list',
        component: GroupListComponent,
      },
      {
        path: 'create',
        component: GroupCreateComponent,
      },
      {
        path: 'archived',
        component: GroupArchivedComponent,
      },
    ])
  ]
})
export class GroupModule { }
