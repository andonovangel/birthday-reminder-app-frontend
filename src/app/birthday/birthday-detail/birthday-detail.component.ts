import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBirthday } from '../birthday';
import { BirthdayService } from '../birthday.service';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/group/group.service';
import { IGroup } from 'src/app/group/group';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'birthday-detail',
  templateUrl: './birthday-detail.component.html',
  styleUrls: ['./birthday-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BirthdayDetailComponent implements OnInit, OnDestroy {
  public pageTitle: string = 'Birthday Details'
  public birthdays: IBirthday[] = []
  public errorMessage: string = ''
  public groups?: IGroup[]
  
  private deleteBirthdaysSub?: Subscription
  private getGroupsSub?: Subscription

  @Input() birthday?: IBirthday
  @Input() group?: IGroup

  constructor(
    private birthdayService: BirthdayService, 
    private route: ActivatedRoute, 
    private router: Router,
    private activeModal: NgbActiveModal,
    private groupService: GroupService,
    private cds: ConfirmationDialogService,
  ) {}

  ngOnInit(): void {
    this.getGroupsSub = this.getGroups()
  }

  ngOnDestroy(): void {
    this.getGroupsSub?.unsubscribe()
    this.deleteBirthdaysSub?.unsubscribe()
  }

  closeModal() {
    this.activeModal.close()
  }

  editBirthday(id: number) {
    this.closeModal()
    this.router.navigate(['/birthdays/edit', id])
  }

  confirmDeletion(birthday: IBirthday) {    
    this.cds.confirm("Archive " + birthday.name + "?", 'You can restore it if you change your mind.')
    .then((confirmed) => {
      if(confirmed) {
        this.deleteBirthday(birthday)
      }
    })
    .catch(() => console.log('User dismissed the dialog'))
  }

  deleteBirthday(birthday: IBirthday) {
    this.deleteBirthdaysSub = this.birthdayService.deleteBirthday(birthday).subscribe({
      next: res => {
        console.log(res)
        this.closeModal()
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getGroups(): Subscription {
    return this.groupService.getGroups().subscribe({
      next: groups => {
        this.groups = groups
      },
      error: err => {
        this.errorMessage = err
      }
    })
  }

  getGroup(birthday: IBirthday) {
    return this.groups?.find(x => x.id === birthday.group_id)
  }

  goToGroup(group?: IGroup) {
    this.closeModal()
    this.router.navigate(['/birthdays/', group?.id])
  }
}
