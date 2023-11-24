import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserProfileService } from '../user-profile.service';
import Pusher from 'pusher-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnDestroy {
  public formGroup! : FormGroup
  public emailError: string | undefined
  public nameError: string | undefined
  public confirmationEmailError: string | undefined
  public confirmationPasswordError: string | undefined
  public submitted: boolean = false;

  public name: string = JSON.parse(localStorage.getItem('user') || '{}').name
  public email: string = JSON.parse(localStorage.getItem('user') || '{}').email

  private getCurrentUserSub?: Subscription
  private updateUserSub?: Subscription

  constructor(
    private auth: AuthService, 
    private router: Router,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.getCurrentUserSub = this.auth.getCurrentUser().subscribe({
      next: user => {
        if (user) {
          this.name = user.name
          this.email = user.email

          if (user.name != undefined)
            localStorage.setItem('name', user.name)

          if (user.email != undefined)
            localStorage.setItem('email', user.email)
        }
      },
      error: err => {
        console.log(err)
      }
    })

    this.formGroup = new FormGroup({
      name: new FormControl(this.name, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      email: new FormControl(this.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ])
    })
  }
  
  ngOnDestroy(): void {
    this.getCurrentUserSub?.unsubscribe()
    this.updateUserSub?.unsubscribe()
  }

  getPusherData() {
    Pusher.logToConsole = true;

    const pusher = new Pusher('ea4bb3965237a32a93ba', {
      cluster: 'eu'
    });
    
    const channel = pusher.subscribe('user-updates')
    channel.bind('update', (data: any) => {
      
      localStorage.setItem('user', JSON.stringify(JSON.parse(JSON.stringify(data)).user));
      this.auth.setCurrentUser(JSON.parse(JSON.stringify(data)).user)
    });
  }

  onSubmit() {
    this.submitted = true

    this.getPusherData()
    
    this.updateUserSub = this.userService.updateUser(this.formGroup.value).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(['/profile'])
      },
      error: err => {
        console.log(err)

        if (err.error.data['name']) {
          console.log(err.error.data['name'])
          this.nameError = err.error.data['name']
          this.formGroup.controls['name'].setErrors({'incorrect': true})
        }
        
        if (err.error.data['email']) {
          console.log(err.error.data['email'])
          this.emailError = err.error.data['email']
          this.formGroup.controls['email'].setErrors({'incorrect': true})
        }
      }
    })
  }
}
