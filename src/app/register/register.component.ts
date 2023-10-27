import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  public formGroup! : FormGroup
  public emailError: string | undefined
  public nameError: string | undefined
  public submitted: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
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
      ])
    })
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.auth.registerUser(this.formGroup.value).subscribe({
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

          if (err.error.errors['name']) {
            this.nameError = err.error.errors['name']
  
            this.formGroup.controls['name'].setErrors({'incorrect': true})
          }
        },
      })
    }
  }
}
