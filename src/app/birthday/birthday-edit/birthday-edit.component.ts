import { Component, OnDestroy, OnInit } from '@angular/core';
import { BirthdayService } from '../birthday.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBirthday } from '../birthday';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IGroup } from 'src/app/group/group';
import { GroupService } from 'src/app/group/group.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-birthday-edit',
  templateUrl: './birthday-edit.component.html',
  styleUrls: ['./birthday-edit.component.scss']
})
export class BirthdayEditComponent implements OnInit, OnDestroy {
  public birthday?: IBirthday
  public groups?: IGroup[]
  
  public formGroup!: FormGroup
  public submitted: boolean = false

  private getBirthdaySub?: Subscription
  private editBirthdaySub?: Subscription
  private getGroupsSub?: Subscription
  public errorMessage: string = ''

  constructor(
    private birthdayService: BirthdayService,
    private groupService: GroupService,
    private route: ActivatedRoute, 
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.getGroups()
    this.getBirthday(id)
  }

  ngOnDestroy(): void {
    this.getBirthdaySub?.unsubscribe()
    this.editBirthdaySub?.unsubscribe()
    this.getGroupsSub?.unsubscribe()
  }

  getBirthday(id: number): void {
    this.spinner.show()
    this.getBirthdaySub = this.birthdayService.getBirthday(id).subscribe({
      next: birthdays => {
        this.birthday = birthdays
        this.createFormGroup()
        this.spinner.hide()
      },
      error: err => {
        this.spinner.hide()
        this.errorMessage = err
        this.router.navigate(['/birthdays/list'])
      }
    })
  }

  createFormGroup(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.birthday?.name, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      title: new FormControl(this.birthday?.title, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      phone_number: new FormControl(this.birthday?.phone_number, [
        Validators.pattern('^[0-9]*$'),
      ]),
      body: new FormControl(this.birthday?.body, [
        Validators.maxLength(200)
      ]),
      birthday_date: new FormControl(this.birthday?.birthday_date, [
        Validators.required
      ]),
      group_id: new FormControl(this.birthday?.group_id)
    })
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.editBirthdaySub = this.birthdayService.editBirthday(this.formGroup.value, this.birthday?.id).subscribe({
        next: res => {
          console.log(res)
          this.router.navigate(['/birthdays/list'])
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  getGroups(): void {
    this.getGroupsSub =  this.groupService.getGroups().subscribe({
      next: groups => {
        this.groups = groups
      }
    })
  }

  getGroup(birthday: IBirthday): string | undefined {
    return this.groups?.find(x => x.id === birthday.group_id)?.name
  }

  onBack(): void {
    this.router.navigate(['/birthdays/list'])
  }
}
