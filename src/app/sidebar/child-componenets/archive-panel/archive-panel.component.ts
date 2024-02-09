import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BirthdayService } from 'src/app/birthday/birthday.service';
import { IBirthday } from 'src/app/birthday/birthday';
import { IGroup } from 'src/app/group/group';
import { GroupService } from 'src/app/group/group.service';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

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

  constructor(
    private birthdayService: BirthdayService, 
    private groupService: GroupService,
    private cds: ConfirmationDialogService,
  ) {}

  ngOnDestroy(): void {
    this.deleteBirthdaySub?.unsubscribe()
    this.restoreBirthdaySub?.unsubscribe()
    this.deleteGroupSub?.unsubscribe()
    this.restoreGroupSub?.unsubscribe()
  }

  closePanel(): void {
    this.closePanelToggle.emit()
  }

  confirmBirthdayDeletion(birthday: IBirthday): void {
    this.cds.confirm("Delete " + birthday.name + "?", 'You can\'t restore it after deleting.', 'Delete')
    .then((confirmed) => {
      if(confirmed) {
        this.deleteBirthday(birthday)
      }
    })
    .catch(() => console.log('User dismissed the dialog'))
  }

  deleteBirthday(birthday: IBirthday): void {
    this.deleteBirthdaySub = this.birthdayService.deleteBirthday(birthday).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err)
    })
  }

  restoreBirthday(birthday: IBirthday): void {
    this.restoreBirthdaySub = this.birthdayService.restoreBirthday(birthday).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err)
    })
  }

  confirmGroupDeletion(group: IGroup): void {
    this.cds.confirm("Delete " + group.name + "?", 'You can\'t restore it after deleting.', 'Delete')
    .then((confirmed) => {
      if(confirmed) {
        this.deleteGroup(group)
      }
    })
    .catch(() => console.log('User dismissed the dialog'))
  }

  deleteGroup(group: IGroup): void {
    this.deleteGroupSub = this.groupService.deleteGroup(group).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err)
    })
  }

  restoreGroup(group: IGroup): void {
    this.restoreGroupSub = this.groupService.restoreGroup(group).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.log(err)
    })
  }
}