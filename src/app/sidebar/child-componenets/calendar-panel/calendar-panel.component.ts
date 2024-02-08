import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IBirthday } from 'src/app/birthday/birthday';

@Component({
  selector: 'app-calendar-panel',
  templateUrl: './calendar-panel.component.html',
  styleUrls: ['./calendar-panel.component.scss']
})
export class CalendarPanelComponent implements OnInit{
  @Output() closePanelToggle = new EventEmitter<void>()
  @Input() birthdays?: IBirthday[]
  public filterdBirthdays?: IBirthday[] = []
  public currentDate: Date = new Date()
	public model: NgbDateStruct
  
  constructor() {
    this.model = { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() }
  }

  ngOnInit(): void {
    this.filterBirthdays(this.model)
  }

  closePanel(): void {
    this.closePanelToggle.emit()
  }

  filterBirthdays(model: NgbDateStruct): void {
    var date = new Date(model.year, model.month - 1, model.day)
    this.currentDate = date
    this.filterdBirthdays = this.birthdays?.filter((b) => {
      const bDate = new Date(b.birthday_date);
      bDate.setHours(0, 0, 0, 0);
      return bDate.getTime() === date.getTime()
    })
  }
}