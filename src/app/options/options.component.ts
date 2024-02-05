import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBirthday } from '../birthday/birthday';
import { trigger, transition, style, animate } from '@angular/animations';
import { IGroup } from '../group/group';

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
export class OptionsComponent {
  @Input() object?: IBirthday | IGroup
  @Input() optionObject?: IBirthday | IGroup

  @Input() editUrl: string = ''
  @Input() isOptionVisible: boolean = false
  @Input() customStyle?: string

  @Output() optionsToggle = new EventEmitter()
  @Output() deleteToggle = new EventEmitter()

  constructor() {}
  
  handleClickOutside() {
    this.optionsToggle.emit()
  }

  deleteObj(event: Event, object: IBirthday | IGroup) {
    event.stopPropagation()
    if(confirm("Are you sure to delete \"" + object.name + "\"")) {
      this.deleteToggle.emit(object)
    }
  }
} 