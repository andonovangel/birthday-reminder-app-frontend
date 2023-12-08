import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup
  public submitted: boolean = false
  public resetPasswordEmailFlag: boolean = false
  public errorMessage?: string
  public emailError?: string
  
  private sendResetPasswordEmailSub?: Subscription

  constructor(
    private userService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    })
  }
  
  ngOnDestroy(): void {
    this.sendResetPasswordEmailSub?.unsubscribe()
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.sendResetPasswordEmailSub = this.userService.sendResetPasswordEmail(this.formGroup.value).subscribe({
        next: () => {
            this.resetPasswordEmailFlag = true
        },
        error: err => {
          console.log(err)

          if (err.error) {
            this.emailError = err.error
  
            this.formGroup.controls['email'].setErrors({'incorrect': true})
          }
        }
      })
    }
  }
}
