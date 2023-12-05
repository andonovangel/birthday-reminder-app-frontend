import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBirthday } from '../birthday';
import { BirthdayService } from '../birthday.service';

@Component({
  selector: 'app-birthday-archived',
  templateUrl: './birthday-archived.component.html',
  styleUrls: ['./birthday-archived.component.scss']
})
export class BirthdayArchivedComponent {
  pageTitle: string = 'Archived Birthday List'
  errorMessage: string = ''
  getArchivedBirthdaysSub?: Subscription
  deleteBirthdaySub?: Subscription
  restoreBirthdaySub?: Subscription

  private _listFilter: string = ''
  
  get listFilter() : string {
    return this._listFilter
  }

  set listFilter(value : string) {
    this._listFilter = value
    console.log('In setter: ', value)
    this.filteredBirthdays = this.performFilter(value)
  }
  
  filteredBirthdays: IBirthday[] = []
  birthdays: IBirthday[] = []
  
  constructor(
    private birthdayService: BirthdayService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getArchivedBirthdaysSub = this.getArchivedBirthdays()
  }

  ngOnDestroy(): void {
    this.getArchivedBirthdaysSub?.unsubscribe()
    this.deleteBirthdaySub?.unsubscribe()
    this.restoreBirthdaySub?.unsubscribe()
  }
  
  performFilter(filterBy: string): IBirthday[] {
    filterBy = filterBy.toLocaleLowerCase()
    return this.birthdays.filter((birthday: IBirthday) =>
      birthday.name.toLocaleLowerCase().includes(filterBy)
    )
  }

  getArchivedBirthdays() {
    return this.birthdayService.getArchivedBirthdays().subscribe({
      next: birthdays => {
        this.birthdays = birthdays
        this.filteredBirthdays = this.birthdays
      },
      error: err => {
        this.errorMessage = err
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      }
    })
  }

  deleteBirthday(birthday: any) {
    if(confirm("Are you sure to delete " + birthday.name)) {
      this.deleteBirthdaySub = this.birthdayService.deleteBirthday(birthday).subscribe({
        next: res => {
          console.log(res)
          this.getArchivedBirthdays()
          this.router.navigate(['/birthdays/archived'])
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  restoreBirthday(birthday: any) {
    this.restoreBirthdaySub = this.birthdayService.restoreBirthday(birthday).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(['/birthdays/list'])
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
