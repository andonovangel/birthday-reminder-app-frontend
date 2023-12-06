import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { IBirthday } from "../birthday";
import { BirthdayService } from "../birthday.service";
import { Router } from "@angular/router";
import { IGroup } from "src/app/group/group";
import { GroupService } from "src/app/group/group.service";

@Component({
    templateUrl: './birthday-list.component.html',
    // styleUrls: 
})
export class BirthdayListComponent implements OnInit, OnDestroy {
    public pageTitle: string = 'Birthday List'
    public errorMessage: string = ''

    private getBirthdaysSub?: Subscription
    private getGroupsSub?: Subscription
    private deleteBirthdaysSub?: Subscription

    private flagSub?: Subscription

    public filteredBirthdays: IBirthday[] = []
    public birthdays: IBirthday[] = []
    public groups?: IGroup[]

    private _listFilter: string = ''
    
    get listFilter(): string {
        return this._listFilter
    }

    set listFilter(value: string) {
        this._listFilter = value
        console.log('In setter: ', value)
        this.filteredBirthdays = this.performFilter(value)
    }
    
    constructor(
        private birthdayService: BirthdayService, 
        private router: Router,
        private groupService: GroupService
    ) {}

    ngOnInit(): void {
        this.getBirthdaysSub = this.getBirthdays()
        this.getGroupsSub = this.getGroups()
    }

    ngOnDestroy(): void {
        this.getBirthdaysSub?.unsubscribe()
        this.getGroupsSub?.unsubscribe()
        this.deleteBirthdaysSub?.unsubscribe()
    }
    
    performFilter(filterBy: string): IBirthday[] {
        filterBy = filterBy.toLocaleLowerCase()
        return this.birthdays.filter((birthday: IBirthday) =>
            birthday.name.toLocaleLowerCase().includes(filterBy))
    }

    getBirthdays(): Subscription {
        return this.birthdayService.getBirthdays().subscribe({
            next: birthdays => {
                this.birthdays = birthdays
                this.filteredBirthdays = this.birthdays
            },
            error: err => {
                this.errorMessage = err
            }
        })
    }
    

    deleteBirthday(birthday: IBirthday) {
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

    getGroups(): Subscription {
        return this.groupService.getGroups().subscribe({
            next: groups => {
                this.groups = groups
            },
            error: err => {
                this.errorMessage = err
            }
        })
    }

    getGroup(birthday: IBirthday) {
        return this.groups?.find(x => x.id === birthday.group_id)?.name
    }
}