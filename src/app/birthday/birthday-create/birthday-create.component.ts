import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BirthdayService } from '../birthday.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/group/group.service';
import { IGroup } from 'src/app/group/group';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogService } from 'src/app/confirmation-dialog/confirmation-dialog.service';
import { IBirthday } from '../birthday';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-birthday-create',
  templateUrl: './birthday-create.component.html',
  styleUrls: ['./birthday-create.component.scss']
})
export class BirthdayCreateComponent implements OnInit, OnDestroy {
  public submitted: boolean = false
  public formGroup!: FormGroup
  private createBirthdaySub?: Subscription
  private getGroupsSub?: Subscription

  public groups?: IGroup[]

  constructor (
    private birthdayService: BirthdayService,
    private groupService: GroupService,
    private router: Router,
    private datePipe: DatePipe,
    private cds: ConfirmationDialogService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getGroupsSub = this.getGroups()

    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      phone_number: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
      ]),
      body: new FormControl('', [
        Validators.maxLength(200)
      ]),
      birthday_date: new FormControl('', [
        Validators.required
      ]),
      group_id: new FormControl(null)
    })
  }
  
  ngOnDestroy(): void {
    this.createBirthdaySub?.unsubscribe()
    this.getGroupsSub?.unsubscribe()
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      this.datePipe.transform(this.formGroup.value.birthday_date, 'MM-dd') === this.datePipe.transform(new Date(), 'MM-dd') ? 
        this.confirmEmailReminder(this.formGroup.value) :
        this.create()
    }
  }

  confirmEmailReminder(birthday: IBirthday) {
    this.cds.confirm("You entered todays date", 'Do you want to be send an email reminder?', 'Send')
      .then((confirmed) => {
        this.create()
        if(confirmed) {
          this.birthdayService.sendEmail(birthday).subscribe({
            next: res => {
              console.log(res)
              this.toastr.success(res.message, 'Success')
            },
            error: err => {
              this.toastr.error('Something went wrong.', 'Error', {
                timeOut: 3000,
              })
              console.log(err)
            }
          })
        }
      })
      .catch(() => console.log('User dismissed the dialog'))
  }

  create() {
    this.createBirthdaySub = this.birthdayService.createBirthday(this.formGroup.value).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(['/birthdays/list'])
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
      }
    })
  }

  onBack(): void {
    this.router.navigate(['/birthdays/list']);
  }
}
