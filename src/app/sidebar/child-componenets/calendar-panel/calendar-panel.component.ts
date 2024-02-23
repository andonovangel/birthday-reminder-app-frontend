import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
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
  
  constructor(
    private birthdayService: BirthdayService, 
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
  ) {
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
    var date = new Date(model.year, model.month - 1, model.day)
    this.currentDate = date

    this.spinner.show('calendar-panel')
    this.birthdayService.getBirthdaysData(new HttpParams().set('date', this.datePipe.transform(date, 'yyyy-MM-dd') || '')).subscribe({
      next: res => {
        this.filteredBirthdays = res
        this.spinner.hide('calendar-panel')
      },
      error: err => {
        this.spinner.hide('calendar-panel')
        console.log(err)
      }
    })
  }
}