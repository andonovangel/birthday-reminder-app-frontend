import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
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
  @Output() closePanelToggle = new EventEmitter<void>()
  @Output() refreshToggle = new EventEmitter<void>()
  private deleteGroupSub?: Subscription

  constructor(private groupService: GroupService) {}

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
        this.isOptionVisible = false
        this.refreshToggle.emit()
      },
      error: err => console.log(err)
    })
  }
}
