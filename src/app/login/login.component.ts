import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup
  public submitted: boolean = false
  
  private loginUserSub?: Subscription

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
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
          this.router.navigate(['/birthdays/list'])
        },
        error: err => {
          console.log(err)
          this.toastr.error('Incorrect email or password.', 'Error', {
            timeOut: 3000,
          })
        }
      })
    }
  }
}

