import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGroup } from '../group';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-archived',
  templateUrl: './group-archived.component.html',
  styleUrls: ['./group-archived.component.scss']
})
export class GroupArchivedComponent {
  public pageTitle: string = 'Archived Group List'
  public errorMessage: string = ''
  private getArchivedGroupsSub?: Subscription
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
    this.getArchivedGroupsSub = this.getArchivedGroups()
  }

  ngOnDestroy(): void {
    this.getArchivedGroupsSub?.unsubscribe()
    this.deleteGroupSub?.unsubscribe()
    this.restoreGroupSub?.unsubscribe()
  }
    
  performFilter(filterBy: string): IGroup[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.groups.filter((group: IGroup) =>
      group.name.toLocaleLowerCase().includes(filterBy)
    )
  }

  getArchivedGroups() {
    return this.groupService.getArchivedGroups().subscribe({
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
          this.getArchivedGroups()
          this.router.navigate(['/groups/archived'])
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  restoreGroup(group: any) {
    this.restoreGroupSub = this.groupService.restoreGroup(group).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(['/groups/list'])
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
