import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BirthdayService } from '../birthday/birthday.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData: any = {}

  constructor(private auth: AuthService, private router: Router, private birthdayService: BirthdayService) {}

  ngOnInit(): void {
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(['/welcome'])
      },
      error: err => {
        console.log(err)
      }
    })
  }
}

