import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
  public formGroup! : FormGroup
  public emailError?: string
  public usernameError?: string
  public confirmationPasswordError?: string
  public submitted: boolean = false;
  private registerUserSub?: Subscription

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      name: new FormControl('', [
        Validators.nullValidator,
      ]),
      surname: new FormControl('', [
        Validators.nullValidator,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/),
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      confirmationPassword: new FormControl('', [
        Validators.required,
      ])
    })
  }
  
  ngOnDestroy(): void {
    this.registerUserSub?.unsubscribe()
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      this.registerUserSub = this.auth.registerUser(this.formGroup.value).subscribe({
        next: res => {
          console.log(res)
          this.router.navigate(['/welcome'])
        },
        error: err => {
          console.log(err)
          
          if (err.error.errors['email']) {
            this.emailError = err.error.errors['email']
            this.formGroup.controls['email'].setErrors({'incorrect': true})
          }

          if (err.error.errors['username']) {
            this.usernameError = err.error.errors['username']

            this.formGroup.controls['username'].setErrors({'incorrect': true})
          }

          if (err.error.errors['confirmationPassword']) {
            this.confirmationPasswordError = err.error.errors['confirmationPassword']

            this.formGroup.controls['confirmationPassword'].setErrors({'incorrect': true})
          }
        },
      })
    }
  }
}
