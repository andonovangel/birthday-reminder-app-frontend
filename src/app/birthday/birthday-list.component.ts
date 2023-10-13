import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IBirthday } from "./birthday";
import { BirthdayService } from "./birthday.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
    templateUrl: './birthday-list.component.html',
    // styleUrls: 
})
export class BirthdayListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Birthday List';
    errorMessage: string = '';
    sub!: Subscription;

    private _listFilter: string = '';
    
    get listFilter() : string {
        return this._listFilter;
    }

    set listFilter(value : string) {
        this._listFilter = value;
        console.log('In setter: ', value);
        this.filteredBirthdays = this.performFilter(value);
    }
    
    filteredBirthdays: IBirthday[] = [];
    birthdays: IBirthday[] = [];
    
    constructor(private birthdayService: BirthdayService, private router: Router) {
    }
    
    performFilter(filterBy: string): IBirthday[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.birthdays.filter((birthday: IBirthday) =>
            birthday.name.toLocaleLowerCase().includes(filterBy));
    }

    ngOnInit(): void {
        this.sub = this.birthdayService.getBirthdays().subscribe({
            next: birthdays => {
                console.log(birthdays);
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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    
}