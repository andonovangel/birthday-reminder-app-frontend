import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGroup } from '../group';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {
  public pageTitle: string = 'Group List'
  public errorMessage: string = ''
  private getGroupsSub?: Subscription
  private deleteGroupSub?: Subscription
  private restoreGroupSub?: Subscription

  public filteredGroups: IGroup[] = []
  private groups: IGroup[] = []
  private _listFilter: string = ''

  constructor(
    private groupService: GroupService,
    private router: Router
  ) {}
    
  get listFilter() : string {
    return this._listFilter
  }

  set listFilter(value : string) {
    this._listFilter = value
    console.log('In setter: ', value)
    this.filteredGroups = this.performFilter(value)
  }

  ngOnInit(): void {
    this.getGroupsSub = this.getGroups()
  }

  ngOnDestroy(): void {
    this.getGroupsSub?.unsubscribe()
    this.deleteGroupSub?.unsubscribe()
    this.restoreGroupSub?.unsubscribe()
  }
    
  performFilter(filterBy: string): IGroup[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.groups.filter((group: IGroup) =>
      group.name.toLocaleLowerCase().includes(filterBy)
    )
  }

  getGroups() {
    return this.groupService.getGroups().subscribe({
      next: groups => {
        this.groups = groups
        this.filteredGroups = this.groups
      },
      error: err => {
        this.errorMessage = err
      }
    })
  }

  deleteGroup(group: any) {
    if(confirm("Are you sure to delete " + group.name)) {
      this.deleteGroupSub = this.groupService.deleteGroup(group).subscribe({
        next: res => {
          console.log(res)
          this.getGroups()
          this.router.navigate(['/groups/list'])
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
}
