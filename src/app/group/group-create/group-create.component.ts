import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit, OnDestroy {
  public submitted: boolean = false
  public formGroup!: FormGroup
  private createGroupSub?: Subscription
  
  public nameError?: string

  constructor(
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl('', [
        Validators.maxLength(200)
      ]),
    })
  }

  ngOnDestroy(): void {
    this.createGroupSub?.unsubscribe()
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.createGroupSub = this.groupService.createGroup(this.formGroup.value).subscribe({
        next: res => {
          console.log(res)
          this.router.navigate(['/birthdays/list'])
        },
        error: err => {
          console.log(err)

          if (err.error.data['name']) {
            console.log(err.error.data['name'])
            this.nameError = err.error.data['name']
            this.formGroup?.controls['name'].setErrors({'incorrect': true})
          }
        }
      })
    }
  }

  onBack(): void {
    this.router.navigate(['/birthdays/list']);
  }
}
