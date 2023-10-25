import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BirthdayService } from '../birthday.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-birthday-create',
  templateUrl: './birthday-create.component.html',
  styleUrls: ['./birthday-create.component.scss']
})
export class BirthdayCreateComponent implements OnInit {
  submitted: boolean = false
  createForm: any;

  constructor (
    private auth: AuthService,
    private birthdayService: BirthdayService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      phone_number: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
      ]),
      body: new FormControl('', [
        Validators.maxLength(500),
      ]),
      birthday_date: new FormControl('', [
        Validators.required
      ]),
      group_id: new FormControl(null, [
        Validators.nullValidator
      ])
    })
  }

  get name() { return this.createForm.get('name'); }
  get title() { return this.createForm.get('title'); }
  get phone_number() { return this.createForm.get('phone_number'); }
  get birthday_date() { return this.createForm.get('birthday_date'); }
  
  onSubmit() {
    if (this.createForm.invalid) {
      this.submitted = true
    } else {
      console.log(this.createForm.value)
      this.birthdayService.createBirthday(this.createForm.value).subscribe({
        next: res => {
          console.log(res)
          this.router.navigate(['/birthdays'])
        },
        error: err => {
          console.log(err)
        }
      })
      this.createForm.reset()
    }

  }

  onBack(): void {
    this.router.navigate(['/birthdays']);
  }
}
