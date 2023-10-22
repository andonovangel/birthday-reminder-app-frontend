import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BirthdayService } from '../birthday.service';

@Component({
  selector: 'app-birthday-create',
  templateUrl: './birthday-create.component.html',
  styleUrls: ['./birthday-create.component.scss']
})
export class BirthdayCreateComponent implements OnInit {
  createBirthdayData = {
    name: '',
    title: '',
    phone_number: '',
    body: '',
    birthday_date: '',
    group_id: null
  }
  
  constructor (
    private auth: AuthService,
    private birthdayService: BirthdayService, 
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  createBirthday() {
    this.birthdayService.createBirthday(this.createBirthdayData).subscribe({
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
