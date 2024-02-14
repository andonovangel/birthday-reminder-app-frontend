import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserProfileService } from '../../user-profile/user-profile.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup
  public submitted: boolean = false
  public errorMessage?: string
  public tokenError?: string
  
  private resetPasswordSub?: Subscription

  private token: string = ''

  constructor(
    private userService: UserProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token =  this.route.snapshot.paramMap.get('token') || ''
    this.formGroup = new FormGroup({
      password: new FormControl('', [
        Validators.required,
      ]),
      confirmationPassword: new FormControl('', [
        Validators.required,
      ])
    })
  }
  
  ngOnDestroy(): void {
    this.resetPasswordSub?.unsubscribe()
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.resetPasswordSub = this.userService.resetPassword(this.formGroup.value, this.token).subscribe({
        next: () => {
            this.router.navigate(['/login'])
        },
        error: err => {
          console.log(err)

          if (err.error) {
            this.errorMessage = err.error
  
            this.formGroup.setErrors({'incorrect': true})
          }
        }
      })
    }
  }
}
