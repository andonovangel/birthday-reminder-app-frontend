import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserProfileService } from '../user-profile.service';
import { Subscription } from 'rxjs';
import { IUser } from '../user';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnDestroy {
  public formGroup?: FormGroup
  public emailError?: string
  public nameError?: string
  public confirmationEmailError?: string
  public confirmationPasswordError?: string
  public submitted: boolean = false;
  public isFormCreated = false

  public user?: IUser

  private getUserSub?: Subscription
  private updateUserSub?: Subscription

  constructor(
    private auth: AuthService, 
    private userService: UserProfileService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      this.getUserSub = this.userService.getUser().subscribe({
        next: (user: any) => {
          this.user = user

          this.createFormGroup() 
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }
  
  ngOnDestroy(): void {
    this.getUserSub?.unsubscribe()
    this.updateUserSub?.unsubscribe()
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.user?.name, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      email: new FormControl(this.user?.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    })
  }

  onSubmit() {
    this.submitted = true
    
    this.updateUserSub = this.userService.updateUser(this.formGroup?.value).subscribe({
      next: res => {
        this.router.navigate(['/profile'])
      },
      error: err => {
        console.log(err)

        if (err.error.data['name']) {
          console.log(err.error.data['name'])
          this.nameError = err.error.data['name']
          this.formGroup?.controls['name'].setErrors({'incorrect': true})
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
