import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IGroup } from '../group/group';
import { Subscription } from 'rxjs';
import { GroupService } from '../group/group.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public isGroupsPanelExpanded: boolean = false
  public groups?: IGroup[]

  private getGroupsSub?: Subscription

  constructor(private groupService: GroupService) {}
  

  ngOnInit(): void {
    this.getGroups()
  }

  ngOnDestroy(): void {
    this.getGroupsSub?.unsubscribe()
  }


  getGroups() {
    this.getGroupsSub = this.groupService.getGroups().subscribe({
      next: res => {
        this.groups = res
      },
      error: err => {
        console.log(err)
      },
    })
  }

  handleGroupPanelToggle () {
    this.isGroupsPanelExpanded = !this.isGroupsPanelExpanded
  }
}
