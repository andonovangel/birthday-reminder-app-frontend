import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGroup } from 'src/app/group/group';
import { GroupService } from 'src/app/group/group.service';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.scss']
})
export class GroupsPanelComponent implements OnDestroy{
  @Input() groups?: IGroup[]
  @Output() closePanelToggle = new EventEmitter<any>()
  private deleteGroupSub?: Subscription

  constructor(
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.deleteGroupSub?.unsubscribe()
  }

  closePanel() {
    this.closePanelToggle.emit()
  }

  public isOptionVisible: boolean = false
  public optionGroup?: IGroup
  toggleReminderOptions(event: Event, group: IGroup) {
    event.stopPropagation()
    this.toggle()
    this.optionGroup = group
  }

  toggle() {
    this.isOptionVisible = !this.isOptionVisible
  }

  deleteGroup(group: IGroup) {
    this.deleteGroupSub = this.groupService.deleteGroup(group).subscribe({
      next: res => {
        console.log(res)
      
        // Refreshes component
        this.router.routeReuseStrategy.shouldReuseRoute = () => false
        this.router.onSameUrlNavigation = 'reload'  
        this.router.navigate(['./'], { relativeTo: this.route, queryParamsHandling: 'merge' })
      },
      error: err => console.log(err)
    })
  }
}
