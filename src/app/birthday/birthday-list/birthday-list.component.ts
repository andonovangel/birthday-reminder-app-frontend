import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { IBirthday } from "../birthday";
import { BirthdayService } from "../birthday.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    templateUrl: './birthday-list.component.html',
    // styleUrls: 
})
export class BirthdayListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Birthday List';
    errorMessage: string = '';
    getBirthdaysSub?: Subscription;
    deleteBirthdaysSub?: Subscription;

    filteredBirthdays: IBirthday[] = [];
    birthdays: IBirthday[] = [];

    private _listFilter: string = '';
    
    get listFilter() : string {
        return this._listFilter;
    }

    set listFilter(value : string) {
        this._listFilter = value;
        console.log('In setter: ', value);
        this.filteredBirthdays = this.performFilter(value);
    }
    
    constructor(
        private birthdayService: BirthdayService, 
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getBirthdaysSub = this.getBirthdays()
    }

    ngOnDestroy(): void {
        this.getBirthdaysSub?.unsubscribe();
        this.deleteBirthdaysSub?.unsubscribe();
    }
    
    performFilter(filterBy: string): IBirthday[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.birthdays.filter((birthday: IBirthday) =>
            birthday.name.toLocaleLowerCase().includes(filterBy));
    }

    getBirthdays() {
        return this.birthdayService.getBirthdays().subscribe({
            next: birthdays => {
                this.birthdays = birthdays;
                this.filteredBirthdays = this.birthdays;
            },
            error: err => {
                this.errorMessage = err
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['/login'])
                    }
                }
            }
        });
    }
    

    deleteBirthday(birthday: any) {
        if(confirm("Are you sure to delete " + birthday.name)) {
            this.deleteBirthdaysSub = this.birthdayService.deleteBirthday(birthday).subscribe({
                next: res => {
                    console.log(res)
                    this.getBirthdays()
                    this.router.navigate(['/birthdays/list'])
                },
                error: err => {
                    console.log(err)
                }
            })
        }
    }
}