import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../user-profile/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public pageTitle = 'Welcome'
  public user?: IUser
  public formGroup!: FormGroup
  public submitted: boolean = false

  constructor (private auth: AuthService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
    })
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
    }
  }
}
