import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IBirthday } from 'src/app/birthday/birthday';
import { BirthdayService } from 'src/app/birthday/birthday.service';

@Component({
  selector: 'app-calendar-panel',
  templateUrl: './calendar-panel.component.html',
  styleUrls: ['./calendar-panel.component.scss']
})
export class CalendarPanelComponent implements OnInit{
  @Output() closePanelToggle = new EventEmitter<void>()
  @Input() birthdays?: IBirthday[]
  public filteredBirthdays?: IBirthday[] = []
  public currentDate: Date = new Date()
	public model: NgbDateStruct
  
  constructor(private birthdayService: BirthdayService, private datePipe: DatePipe) {
    this.model = { 
      year: this.currentDate.getFullYear(), 
      month: this.currentDate.getMonth() + 1, 
      day: this.currentDate.getDate() 
    }
  }

  ngOnInit(): void {
    this.filterBirthdays(this.model)
  }

  closePanel(): void {
    this.closePanelToggle.emit()
  }

  filterBirthdays(model: NgbDateStruct): void {
    var date = this.datePipe.transform(new Date(model.year, model.month - 1, model.day), 'yyyy-MM-dd') || ''
    var params = new HttpParams().set('date', date)

    this.birthdayService.getBirthdaysByDate(params).subscribe({
      next: res => {
        this.filteredBirthdays = res
      },
      error: err => console.log(err)
    })


    // this.currentDate = date
    // this.filterdBirthdays = this.birthdays?.filter((b) => {
    //   const bDate = new Date(b.birthday_date);
    //   bDate.setHours(0, 0, 0, 0);
    //   return bDate.getTime() === date.getTime()
    // })
  }
}