import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup
  public submitted: boolean = false
  public errorMessage?: string
  
  private loginUserSub?: Subscription

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
      ]),
      remember: new FormControl(false),
    })
  }
  
  ngOnDestroy(): void {
    this.loginUserSub?.unsubscribe()
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      this.loginUserSub = this.auth.loginUser(this.formGroup.value).subscribe({
        next: () => {
          this.router.navigate(['/welcome'])
        },
        error: err => {
          console.log(err)
          
          if (err.error.message) {
            this.errorMessage = err.error.message
            this.formGroup.setErrors({'incorrect': true})
          }
        }
      })
    }
  }
}

