import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGroup } from '../group';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../group.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit, OnDestroy {
  public group?: IGroup
  private getGroupsSub?: Subscription
  private editGroupSub?: Subscription
  
  public errorMessage: string = ''
  public nameError?: string

  submitted: boolean = false
  formGroup!: FormGroup

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.getGroupsSub = this.groupService.getGroups().subscribe({
      next: groups => {
        this.group = groups.find(x => x.id === id)

        this.createFormGroup()
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.getGroupsSub?.unsubscribe()
    this.editGroupSub?.unsubscribe()
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
          this.router.navigate(['/groups/list'])
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
