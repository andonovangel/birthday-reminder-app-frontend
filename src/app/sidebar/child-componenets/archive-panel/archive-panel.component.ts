import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BirthdayService } from 'src/app/birthday/birthday.service';
import { IBirthday } from 'src/app/birthday/birthday';
import { IGroup } from 'src/app/group/group';
import { GroupService } from 'src/app/group/group.service';

@Component({
  selector: 'app-archive-panel',
  templateUrl: './archive-panel.component.html',
  styleUrls: ['./archive-panel.component.scss']
})
export class ArchivePanelComponent implements OnDestroy {
  @Input() birthdays?: IBirthday[]
  @Input() groups?: IGroup[]
  @Output() closePanelToggle = new EventEmitter<void>()

  private deleteBirthdaySub?: Subscription
  private restoreBirthdaySub?: Subscription
  private deleteGroupSub?: Subscription
  private restoreGroupSub?: Subscription

  constructor(private birthdayService: BirthdayService, private groupService: GroupService) {}

  ngOnDestroy(): void {
    this.deleteBirthdaySub?.unsubscribe()
    this.restoreBirthdaySub?.unsubscribe()
    this.deleteGroupSub?.unsubscribe()
    this.restoreGroupSub?.unsubscribe()
  }

  closePanel() {
    this.closePanelToggle.emit()
  }

  deleteBirthday(birthday: IBirthday) {
    if(confirm("Are you sure to delete " + birthday.name)) {
      this.deleteBirthdaySub = this.birthdayService.deleteBirthday(birthday).subscribe({
        next: res => {
          console.log(res)
        },
        error: err => console.log(err)
      })
    }
  }

  restoreBirthday(birthday: IBirthday) {
    this.restoreBirthdaySub = this.birthdayService.restoreBirthday(birthday).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err)
    })
  }

  deleteGroup(group: IGroup) {
    if(confirm("Are you sure to delete " + group.name)) {
      this.deleteGroupSub = this.groupService.deleteGroup(group).subscribe({
        next: res => {
          console.log(res)
        },
        error: err => console.log(err)
      })
    }
  }

  restoreGroup(group: IGroup) {
    this.restoreGroupSub = this.groupService.restoreGroup(group).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err)
    })
  }
}