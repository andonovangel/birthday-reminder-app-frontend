import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  public formGroup! : FormGroup
  public emailError: string | undefined
  public nameError: string | undefined
  public confirmationEmailError: string | undefined
  public confirmationPasswordError: string | undefined
  public submitted: boolean = false;

  public name: string = JSON.parse(localStorage.getItem('user') || '{}').name
  public email: string = JSON.parse(localStorage.getItem('user') || '{}').email

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
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

  onSubmit() {
    // this.submitted = true
    // this.auth.registerUser(this.formGroup.value).subscribe({
    //   next: res => {
    //     console.log(res)
    //     this.router.navigate(['/welcome'])
    //   },
    //   error: err => {
    //     console.log(err)
        
    //     if (err.error.errors['email']) {
    //       this.emailError = err.error.errors['email']
    //       this.formGroup.controls['email'].setErrors({'incorrect': true})
    //     }

    //     if (err.error.errors['name']) {
    //       this.nameError = err.error.errors['name']

    //       this.formGroup.controls['name'].setErrors({'incorrect': true})
    //     }
    //   }
    // })
  }
}
