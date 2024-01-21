import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { IGroup } from '../group/group';
import { Subscription } from 'rxjs';
import { GroupService } from '../group/group.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
      trigger('panelAnimation', [
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
export class SidebarComponent implements OnInit, OnDestroy {
  public isGroupsPanelExpanded: boolean = false
  public groups?: IGroup[]

  private getGroupsSub?: Subscription

  constructor(
    private groupService: GroupService,
    private renderer: Renderer2,
  ) {}

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
