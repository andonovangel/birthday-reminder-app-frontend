import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IBirthday } from '../birthday';
import { BirthdayService } from '../birthday.service';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/group/group.service';
import { IGroup } from 'src/app/group/group';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'birthday-detail',
  templateUrl: './birthday-detail.component.html',
  styleUrls: ['./birthday-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BirthdayDetailComponent implements OnInit, OnDestroy {
  @Input() birthday: IBirthday = {} as IBirthday
  @Input() group?: IGroup
  public errorMessage: string = ''
  
  private deleteBirthdaysSub?: Subscription
  private getGroupSub?: Subscription

  constructor(
    private birthdayService: BirthdayService,
    private router: Router,
    private activeModal: NgbActiveModal,
    private groupService: GroupService,
    private cds: ConfirmationDialogService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    (this.birthday.group_id && this.group === undefined) && this.getGroup(this.birthday.group_id)
  }

  ngOnDestroy(): void {
    this.getGroupSub?.unsubscribe()
    this.deleteBirthdaysSub?.unsubscribe()
  }

  getGroup(id: number): void {
    this.getGroupSub = this.groupService.getGroup(id).subscribe({
        next: res => {
          this.group = res
        },
        error: () => this.router.navigate(['/birthdays/list']),
    })
  }

  editBirthday(id: number): void {
    this.closeModal()
    this.router.navigate(['/birthdays/edit', id])
  }

  confirmDeletion(birthday: IBirthday): void {    
    this.cds.confirm("Archive " + birthday.name + "?", 'You can restore it if you change your mind.', 'Archive')
    .then((confirmed) => {
      if(confirmed) {
        this.deleteBirthday(birthday)
      }
    })
    .catch(() => console.log('User dismissed the dialog'))
  }

  deleteBirthday(birthday: IBirthday): void {
    this.deleteBirthdaysSub = this.birthdayService.deleteBirthday(birthday).subscribe({
      next: res => {
        console.log(res)
        this.closeModal()
        this.toastr.success('Archived reminder.', 'Success')
      },
      error: err => {
        this.toastr.error('Something went wrong.', 'Error', {
          timeOut: 3000,
        })
        console.log(err)
      }
    })
  }

  goToGroup(group?: IGroup): void {
    this.closeModal()
    this.router.navigate(['/birthdays/', group?.id])
  }

  closeModal(): void {
    this.activeModal.close()
  }
}
