import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IBirthday } from 'src/app/birthday/birthday';

@Component({
  selector: 'app-calendar-panel',
  templateUrl: './calendar-panel.component.html',
  styleUrls: ['./calendar-panel.component.scss']
})
export class CalendarPanelComponent{
  @Output() closePanelToggle = new EventEmitter<void>()
  @Input() birthdays?: IBirthday[]
  public filterdBirthdays?: IBirthday[] = []
  private currentDate: Date = new Date()
	public model: NgbDateStruct
  
  constructor() {
    this.model = { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() }
  }

  closePanel() {
    this.closePanelToggle.emit()
  }

  getDate(model: NgbDateStruct): void {
    var date = new Date(model.year, model.month - 1, model.day)
    this.filterdBirthdays = this.birthdays?.filter((b) => {
      const bDate = new Date(b.birthday_date);
      bDate.setHours(0, 0, 0, 0);
      return bDate.getTime() === date.getTime()
    })
  }
}