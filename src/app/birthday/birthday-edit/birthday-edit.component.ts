import { Component, OnDestroy, OnInit } from '@angular/core';
import { BirthdayService } from '../birthday.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBirthday } from '../birthday';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-birthday-edit',
  templateUrl: './birthday-edit.component.html',
  styleUrls: ['./birthday-edit.component.scss']
})
export class BirthdayEditComponent implements OnInit, OnDestroy {
  birthday: IBirthday | undefined;
  sub!: Subscription
  errorMessage: string = '';

  submitted: boolean = false
  formGroup!: FormGroup;

  birthdayData = {
    id: 0,
    name: '',
    title: '',
    phone_number: '',
    body: '',
    birthday_date: '',
    group_id: null
  }

  constructor(
    private birthdayService: BirthdayService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.sub = this.birthdayService.getBirthdays().subscribe({
      next: birthdays => {
          this.birthday = birthdays.find(x => x.id === id)

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
      },
      error: err => this.errorMessage = err
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.birthdayService.editBirthday(this.formGroup.value, this.birthday?.id).subscribe({
        next: res => {
          console.log(res)
          this.router.navigate(['/birthdays'])
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/birthdays']);
  }
}
