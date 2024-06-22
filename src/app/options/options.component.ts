import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBirthday } from '../birthday/birthday';
import { trigger, transition, style, animate } from '@angular/animations';
import { IGroup } from '../group/group';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'more-options',
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
  @Output() clickToggle = new EventEmitter()

  constructor(private cds: ConfirmationDialogService) { }

  handleClickOutside(): void {
    this.optionsToggle.emit()
  }

  toggleClick(): void {
    this.clickToggle.emit()
  }

  deleteObj(event: Event, object: IBirthday | IGroup): void {
    event.stopPropagation()

    this.cds.confirm("Archive " + object.name + "?", 'You can restore it if you change your mind.', 'Archive')
      .then((confirmed) => {
        if (confirmed) {
          this.deleteToggle.emit(object)
          this.clickToggle.emit()
        }
      })
      .catch(() => console.log('User dismissed the dialog'))
  }
}