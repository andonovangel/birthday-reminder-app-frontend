import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IBirthday } from '../birthday';

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
  
  constructor (private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  createBirthday() {
        // console.log(this.createBirthdayData)
    this.auth.createBirthday(this.createBirthdayData).subscribe({
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
