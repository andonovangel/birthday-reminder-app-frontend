import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { IGroup } from 'src/app/group/group';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.scss'],
  animations: [
      trigger('options', [
          transition(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('500ms ease-out', style({ transform: 'translateX(0)' })),
          ]),
          transition(':leave', [
            animate('500ms ease-out', style({ transform: 'translateX(-100%)' })),
          ]),
      ]),
  ]
})
export class GroupsPanelComponent{
  @Input() groups?: IGroup[]
  @Input() isGroupsPanelExpanded?: boolean

}
