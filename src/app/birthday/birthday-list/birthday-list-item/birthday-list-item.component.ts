import { Component, Input, OnDestroy } from '@angular/core';
import { IBirthday } from '../../birthday';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BirthdayDetailComponent } from '../../birthday-detail/birthday-detail.component';
import { IGroup } from 'src/app/group/group';
import { Subscription } from 'rxjs';
import { BirthdayService } from '../../birthday.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-birthday-list-item',
  templateUrl: './birthday-list-item.component.html',
  styleUrls: ['./birthday-list-item.component.scss']
})
export class BirthdayListItemComponent implements OnDestroy {
  public deleteBirthdaySub?: Subscription;
  public optionBirthday?: IBirthday;
  public isOptionVisible: boolean = false;

  @Input() birthday!: IBirthday;
  @Input() group?: IGroup;

  constructor(
    private modalService: NgbModal,
    private birthdayService: BirthdayService,
    private toastr: ToastrService,
  ) {}

  ngOnDestroy(): void {
    this.deleteBirthdaySub?.unsubscribe();
  }

  openModal(birthday: IBirthday) {
    const modalRef = this.modalService.open(BirthdayDetailComponent, {
      modalDialogClass: 'custom-modal', 
      centered: true, 
      size: 'lg' 
    });
    modalRef.componentInstance.birthday = birthday;
    modalRef.componentInstance.group = this.group;
  }

  toggleReminderOptions(event: Event, birthday: IBirthday) {
    event.stopPropagation();
    this.toggle();
    this.optionBirthday = birthday;
  }

  toggle() {
    this.isOptionVisible = !this.isOptionVisible;
  }

  deleteBirthday(birthday: IBirthday) {
    this.deleteBirthdaySub = this.birthdayService.deleteBirthday(birthday).subscribe({
      next: res => {
        console.log(res);
        this.isOptionVisible = false;
        this.toastr.success('Archived reminder.', 'Success');
      },
      error: err => {
          this.toastr.error('Something went wrong.', 'Error', {
            timeOut: 3000,
          });
          console.log(err);
      }
    });
  }
}
