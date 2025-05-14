import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public formGroup!: FormGroup;
  public submitted: boolean = false;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initFormGroup();
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
