import { Component, OnInit } from '@angular/core';
import { IUser } from '../user-profile/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public pageTitle = 'Welcome';
  public user?: IUser;
  public formGroup!: FormGroup;
  public submitted: boolean = false;
  public year?: number;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initFormGroup();
    const date = new Date();
    this.year = date.getFullYear();
  }

  initFormGroup(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true;
    } else {
      console.log(this.formGroup.value);
      this.submitted = false;
      this.formGroup.reset();
      this.toastr.success('Message sent.', 'Success');
    }
  }
}
