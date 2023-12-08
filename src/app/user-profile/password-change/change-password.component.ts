import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup
  public submitted: boolean = false
  public errorMessage?: string
  public currentPasswordError?: string
  
  private changePasswordSub?: Subscription

  constructor(
    private userService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required,
      ]),
      newPassword: new FormControl('', [
        Validators.required,
      ]),
      confirmationPassword: new FormControl('', [
        Validators.required,
      ]),
    })
  }
  
  ngOnDestroy(): void {
    this.changePasswordSub?.unsubscribe()
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.changePasswordSub = this.userService.changePassword(this.formGroup.value).subscribe({
        next: () => {
            this.router.navigate(['/profile'])
        },
        error: err => {
          console.log(err)

          if (err.error.currentPassword) {
            this.currentPasswordError = err.error.currentPassword
  
            this.formGroup.controls['currentPassword'].setErrors({'incorrect': true})
          }
        }
      })
    }
  }

  onBack(): void {
    this.router.navigate(['/profile'])
  }
}
