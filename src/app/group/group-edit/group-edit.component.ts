import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGroup } from '../group';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit, OnDestroy {
  public group?: IGroup

  public submitted: boolean = false
  public formGroup!: FormGroup
  public nameError?: String
  public errorMessage: string = ''
  
  private getGroupSub?: Subscription
  private editGroupSub?: Subscription

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.getGroup(id)
  }

  ngOnDestroy(): void {
    this.getGroupSub?.unsubscribe()
    this.editGroupSub?.unsubscribe()
  }

  getGroup(id: number): void {
    this.spinner.show()
    this.getGroupSub = this.groupService.getGroup(id).subscribe({
      next: groups => {
        this.group = groups
        this.createFormGroup()
        this.spinner.hide()
      },
      error: err => {
        this.spinner.hide()
        console.log(err)
      }
    })
  }

  createFormGroup(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.group?.name, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      description: new FormControl(this.group?.description, [
        Validators.maxLength(200)
      ]),
    })
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.submitted = true
    } else {
      console.log(this.formGroup.value)
      this.editGroupSub = this.groupService.editGroup(this.formGroup.value, this.group?.id).subscribe({
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
    this.router.navigate(['/birthdays/list'])
  }
}
