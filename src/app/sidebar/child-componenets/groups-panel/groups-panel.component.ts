import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGroup } from 'src/app/group/group';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.scss']
})
export class GroupsPanelComponent{
  @Input() groups?: IGroup[]
  @Output() closePanelToggle = new EventEmitter<any>()

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
}
