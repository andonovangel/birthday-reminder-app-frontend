import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BirthdayService } from '../birthday.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/group/group.service';
import { IGroup } from 'src/app/group/group';

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
    private router: Router
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
      console.log(this.formGroup.value)
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
