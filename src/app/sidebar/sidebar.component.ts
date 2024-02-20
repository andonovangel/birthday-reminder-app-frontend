import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IGroup } from '../group/group';
import { Subscription, forkJoin } from 'rxjs';
import { GroupService } from '../group/group.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { IBirthday } from '../birthday/birthday';
import { BirthdayService } from '../birthday/birthday.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public isCalendarPanelExpanded: boolean = false
  @Output() isPanelExpanded = new EventEmitter<boolean>()
  
  public birthdays?: IBirthday[]
  public groups?: IGroup[]
  public archivedBirthdays?: IBirthday[]
  public archivedGroups?: IGroup[]

  private getBirthdaysSub?: Subscription
  private getGroupsSub?: Subscription
  private getArchivedSub?: Subscription

  constructor(
    private groupService: GroupService,
    private birthdayService: BirthdayService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.birthdayService.birthdays$.subscribe(updatedBirthdays => {
      this.birthdays = updatedBirthdays
    })

    this.birthdayService.archivedBirthdays$.subscribe(updatedBirthdays => {
      this.archivedBirthdays = updatedBirthdays
    })

    this.groupService.groups$.subscribe(updatedGroups => {
      this.groups = updatedGroups
    })
    
    this.groupService.archivedGroups$.subscribe(updatedArchivedGroups => {
      this.archivedGroups = updatedArchivedGroups
    })
    
    this.getBirthdays()
    this.getGroups()
    this.getArchived()

    if (localStorage.getItem('sidebarPanel') === 'groupPanel') this.handleGroupPanelToggle()
    else if (localStorage.getItem('sidebarPanel') === 'archivePanel') this.handleArchivePanelToggle()
    else if (localStorage.getItem('sidebarPanel') === 'calendarPanel') this.handleCalendarPanelToggle()
  }

  ngOnDestroy(): void {
    this.getBirthdaysSub?.unsubscribe()
    this.getGroupsSub?.unsubscribe()
    this.getArchivedSub?.unsubscribe()
  }

  getBirthdays() {
    this.getBirthdaysSub = this.birthdayService.getBirthdays().subscribe({
      next: res => {
        this.birthdays = res
      },
      error: err => console.log(err)
    })
  }

  getGroups() {
    this.spinner.show('groups-panel')
    this.getGroupsSub = this.groupService.getGroups().subscribe({
      next: res => {
        this.groups = res
        this.spinner.hide('groups-panel')
      },
      error: err => {
        this.spinner.hide('groups-panel')
        console.log(err)
      }
    })
  }

  getArchived() {
    this.spinner.show('archive-panel')
    this.getArchivedSub = forkJoin({
      birthdays: this.birthdayService.getArchivedBirthdays(), 
      groups: this.groupService.getArchivedGroups()
    }).subscribe({
      next: ({birthdays, groups}) => {
        this.archivedBirthdays = birthdays
        this.archivedGroups = groups
        this.spinner.hide('archive-panel')
      },
      error: err => {
        this.spinner.hide('archive-panel')
        console.log(err)
      }
    })
  }

  handleGroupPanelToggle () {
    this.isGroupsPanelExpanded = !this.isGroupsPanelExpanded
    this.isArchivePanelExpanded = false
    this.isCalendarPanelExpanded = false

    this.setCurrentOpenPanel()

    this.isPanelExpanded.emit(this.isGroupsPanelExpanded)
  }

  handleArchivePanelToggle () {
    this.isArchivePanelExpanded = !this.isArchivePanelExpanded
    this.isGroupsPanelExpanded = false
    this.isCalendarPanelExpanded = false

    this.setCurrentOpenPanel()

    this.isPanelExpanded.emit(this.isArchivePanelExpanded)
  }

  handleCalendarPanelToggle () {
    this.isCalendarPanelExpanded = !this.isCalendarPanelExpanded
    this.isGroupsPanelExpanded = false
    this.isArchivePanelExpanded = false

    this.setCurrentOpenPanel()

    this.isPanelExpanded.emit(this.isCalendarPanelExpanded)
  }

  setCurrentOpenPanel() {
    if (this.isGroupsPanelExpanded) 
      localStorage.setItem('sidebarPanel', 'groupPanel')
    else if (this.isArchivePanelExpanded) 
      localStorage.setItem('sidebarPanel', 'archivePanel')
    else if (this.isCalendarPanelExpanded) 
      localStorage.setItem('sidebarPanel', 'calendarPanel')
    else
      localStorage.removeItem('sidebarPanel')
  }
}
