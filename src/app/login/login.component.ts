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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.auth.loginUser(this.formGroup.value).subscribe({
        next: () => {
          this.router.navigate(['/welcome'])
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }
}

