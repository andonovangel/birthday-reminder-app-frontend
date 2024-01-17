import { Component, Input } from '@angular/core';
import { IGroup } from 'src/app/group/group';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.scss']
})
export class GroupsPanelComponent{
  @Input() groups?: IGroup[]

}
