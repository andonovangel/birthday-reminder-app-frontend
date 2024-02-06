import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IGroup } from '../group/group';
import { Subscription } from 'rxjs';
import { GroupService } from '../group/group.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { IBirthday } from '../birthday/birthday';
import { BirthdayService } from '../birthday/birthday.service';

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
  public isArchivePanelExpanded: boolean = false
  @Output() isPanelExpanded = new EventEmitter<boolean>()
  
  public groups?: IGroup[]
  public archivedBirthdays?: IBirthday[]
  public archivedGroups?: IGroup[]

  private getGroupsSub?: Subscription
  private getArchivedBirthdaysSub?: Subscription
  private getArchivedGroupsSub?: Subscription

  constructor(
    private groupService: GroupService,
    private birthdayService: BirthdayService,
  ) {}

  ngOnInit(): void {
    this.birthdayService.archivedBirthdays$.subscribe(updatedBirthdays => {
      this.archivedBirthdays = updatedBirthdays
    })

    this.groupService.groups$.subscribe(updatedGroups => {
      this.groups = updatedGroups
    })
    
    this.groupService.archivedGroups$.subscribe(updatedArchivedGroups => {
      this.archivedGroups = updatedArchivedGroups
    })
    
    this.getArchivedBirthdays()
    this.getArchivedGroups()
    this.getGroups()
  }

  ngOnDestroy(): void {
    this.getArchivedBirthdaysSub?.unsubscribe()
    this.getArchivedGroupsSub?.unsubscribe()
    this.getGroupsSub?.unsubscribe()
  }

  getGroups() {
    this.getGroupsSub = this.groupService.getGroups().subscribe({
      next: res => {
        this.groups = res
      },
      error: err => console.log(err)
    })
  }

  getArchivedBirthdays() {
    this.getArchivedBirthdaysSub = this.birthdayService.getArchivedBirthdays().subscribe({
      next: birthdays => {
        this.archivedBirthdays = birthdays
      },
      error: err => console.log(err)
    })
  }

  getArchivedGroups() {
    this.getArchivedGroupsSub = this.groupService.getArchivedGroups().subscribe({
      next: groups => {
        this.archivedGroups = groups
      },
      error: err => console.log(err)
    })
  }

  handleGroupPanelToggle () {
    this.isGroupsPanelExpanded = !this.isGroupsPanelExpanded
    this.isArchivePanelExpanded = false

    this.isPanelExpanded.emit(this.isGroupsPanelExpanded)
  }

  handleArchivePanelToggle () {
    this.isArchivePanelExpanded = !this.isArchivePanelExpanded
    this.isGroupsPanelExpanded = false

    this.isPanelExpanded.emit(this.isArchivePanelExpanded)
  }
}
