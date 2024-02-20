import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserProfileService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { IUser } from '../user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnDestroy {
  public formGroup?: FormGroup
  public emailError?: string
  public usernameError?: string
  public submitted: boolean = false

  public user?: IUser

  private getUserSub?: Subscription
  private updateUserSub?: Subscription

  constructor(
    private auth: AuthService, 
    private userService: UserProfileService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.getUser()
  }
  
  ngOnDestroy(): void {
    this.getUserSub?.unsubscribe()
    this.updateUserSub?.unsubscribe()
  }

  getUser(): void {
    this.spinner.show()
    this.getUserSub = this.userService.getUser().subscribe({
      next: user => {
        this.user = user
        this.createFormGroup()
        this.spinner.hide() 
      },
      error: err => {
        this.spinner.hide()
        console.log(err)
      }
    })
  }

  createFormGroup(): void {
    this.formGroup = new FormGroup({
      username: new FormControl(this.user?.username, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      name: new FormControl(this.user?.name, [
        Validators.nullValidator,
      ]),
      surname: new FormControl(this.user?.surname, [
        Validators.nullValidator,
      ]),
      email: new FormControl(this.user?.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    })
  }

  onSubmit(): void {
    if (this.formGroup?.invalid) {
      this.submitted = true
    } else {
      this.updateUserSub = this.userService.updateUser(this.formGroup?.value).subscribe({
        next: res => {
          this.router.navigate(['/profile'])
        },
        error: err => {
          console.log(err)

          if (err.error.data['username']) {
            console.log(err.error.data['username'])
            this.usernameError = err.error.data['username']
            this.formGroup?.controls['username'].setErrors({'incorrect': true})
          }
          
          if (err.error.data['email']) {
            console.log(err.error.data['email'])
            this.emailError = err.error.data['email']
            this.formGroup?.controls['email'].setErrors({'incorrect': true})
          }
        }
      })
    }
  }

  onBack(): void {
    this.router.navigate(['/profile'])
  }
}
