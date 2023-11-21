import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
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
  public errorMessage: string | undefined

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
      this.auth.loginUser(this.formGroup.value).subscribe({
        next: () => {
          this.router.navigate(['/welcome'])
        },
        error: err => {
          console.log(err)
          console.log(err.error.message)
          
          if (err.error.message) {
            this.errorMessage = err.error.message
            this.formGroup.setErrors({'incorrect': true})
          }
        }
      })
    }
  }
}

