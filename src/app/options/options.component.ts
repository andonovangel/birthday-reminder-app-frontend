import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { IBirthday } from '../birthday/birthday';
import { BirthdayService } from '../birthday/birthday.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGroup } from '../group/group';
import { GroupService } from '../group/group.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  animations: [
    trigger('options', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ]
})
export class OptionsComponent implements OnDestroy {
  @Input() object?: IBirthday | IGroup
  @Input() optionObject?: IBirthday | IGroup

  @Input() editUrl: string = ''
  @Input() isOptionVisible: boolean = false
  @Output() optionsToggle = new EventEmitter()
  
  @Input() customStyle?: string

  private deleteObjSub?: Subscription

  constructor(
    private birthdayService: BirthdayService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.deleteObjSub?.unsubscribe()
  }
  
  handleClickOutside() {
    this.optionsToggle.emit()
  }

  deleteBirthday(event: Event, object: IBirthday | IGroup) {
    event.stopPropagation()
    if(confirm("Are you sure to delete " + object.name)) {
      if (this.isBirthday(object)) {
        this.deleteObjSub = this.birthdayService.deleteBirthday(object).subscribe({
          next: res => this.handleDeleteSuccess(res),
          error: err => console.log(err)
        })
      } else {
        this.deleteObjSub = this.groupService.deleteGroup(object).subscribe({
          next: res => this.handleDeleteSuccess(res),
          error: err => console.log(err)
        })
      }
    }
  }

  private handleDeleteSuccess(res: any): void {
    console.log(res);
  
    // Refreshes component
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['./'], { relativeTo: this.route, queryParamsHandling: 'merge' })
  }

  isBirthday(object?: IBirthday | IGroup): object is IBirthday {
    return (object as IBirthday).birthday_date !== undefined
  }
} 