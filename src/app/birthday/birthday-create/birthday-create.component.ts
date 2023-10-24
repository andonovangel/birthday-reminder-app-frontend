import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BirthdayService } from '../birthday.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-birthday-create',
  templateUrl: './birthday-create.component.html',
  styleUrls: ['./birthday-create.component.scss']
})
export class BirthdayCreateComponent {
  birthdayData = {
    name: '',
    title: '',
    phone_number: '',
    body: '',
    birthday_date: '',
    group_id: null
  }

  submitted: boolean = false

  constructor (
    private auth: AuthService,
    private birthdayService: BirthdayService, 
    private router: Router
  ) {}
  
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.submitted = true
      form.reset();
    } else {
      console.log(this.birthdayData)
    }

  }

  isNumeric(value: any): boolean {
    return !isNaN(value);
  }

  createBirthday() {
    console.log(this.birthdayData)
    // this.birthdayService.createBirthday(this.birthdayData).subscribe({
    //   next: res => {
    //     console.log(res)
    //     this.router.navigate(['/birthdays'])
    //   },
    //   error: err => {
    //     console.log(err)
    //   }
    // })
  }
}
