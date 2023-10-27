import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BirthdayService } from '../birthday/birthday.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData: any = {}
  public formGroup!: FormGroup
  public submitted: boolean = false

  constructor(
    private auth: AuthService, 
    private router: Router,
    private birthdayService: BirthdayService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/),
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      // this.birthdayService.createBirthday(this.formGroup.value).subscribe({
      //   next: res => {
      //     console.log(res)
      //     this.router.navigate(['/birthdays'])
      //   },
      //   error: err => {
      //     console.log(err)
      //   }
      // })
      // this.formGroup.reset()
    }
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData).subscribe({
      next: res => {
        this.router.navigate(['/welcome'])
      },
      error: err => {
        console.log(err)
      }
    })
  }
}

