import { Component, OnDestroy, OnInit } from "@angular/core";
import { IBirthday } from "../birthday";
import { BirthdayService } from "../birthday.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GroupService } from "src/app/group/group.service";
import { BirthdayListWrapper } from "../birthday-list.wrapper";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, Subscription } from "rxjs";
import { sortOrderMap } from "../filtering.map";

@Component({
    templateUrl: './birthday-list.component.html',
    styleUrls: ['./birthday-list.component.scss']
})
export class BirthdayListComponent implements OnInit, OnDestroy {
    public data = new BirthdayListWrapper()

    constructor(
        private birthdayService: BirthdayService,
        private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.data.birthdayObservableSub = this.birthdayService.birthdays$.subscribe(updatedBirthdays => {
            this.data.birthdays = updatedBirthdays
            this.data.filteredBirthdays = updatedBirthdays
        })

        this.route.params.subscribe(params => {
            this.handleRouteParams(params)
        })
    }

    ngOnDestroy(): void {
        if (this.data.getBirthdaysSub) {
            this.data.getBirthdaysSub.unsubscribe()
        }
        if (this.data.getBirthdaysDataSub) {
            this.data.getBirthdaysDataSub.unsubscribe()
        }
        this.data.getGroupsSub?.unsubscribe()
        this.data.birthdayObservableSub?.unsubscribe()
    }

    getBirthdays(id?: number): void {
        const observable = (id !== undefined) ?
            this.groupService.getBirthdaysByGroup(id) :
            this.birthdayService.getBirthdays()

        this.data.getBirthdaysSub = this.observeBirthdays(observable)
    }

    getBirthdaysData(id?: number): void {
        const observable = (id !== undefined) ?
            this.groupService.getBirthdaysByGroup(id, this.data.params) :
            this.birthdayService.getBirthdaysData(this.data.params)

        this.data.getBirthdaysDataSub = this.observeBirthdays(observable)
    }

    observeBirthdays(observable: Observable<IBirthday[]>): Subscription {
        this.spinner.show()

        return this.data.getBirthdaysDataSub = observable.subscribe({
            next: birthdays => {
                this.data.birthdays = birthdays
                this.data.filteredBirthdays = this.data.birthdays
                this.spinner.hide()
            },
            error: err => {
                this.spinner.hide()
                this.data.errorMessage = err
            },
        })
    }

    onSearchChange() {
        clearTimeout(this.data.timeout)

        this.data.timeout = setTimeout(() => {
            console.log('In setter: ', this.data.listFilter)
            this.data.params = this.data.params.set('search', this.data.listFilter)
            this.spinner.show()

            const observable = (this.data.group !== undefined) ?
            this.groupService.getBirthdaysByGroup(this.data.group.id, this.data.params) :
            this.birthdayService.getBirthdaysData(this.data.params)

            observable.subscribe({
                next: res => {
                    this.data.filteredBirthdays = res
                    this.spinner.hide()
                },
                error: err => {
                    this.spinner.hide()
                    console.log(err)
                }
            })
        }, 300)
    }

    sortRemindersByTitle() {
        this.data.titleSort = sortOrderMap[this.data.titleSort]

        this.data.params = this.data.params
            .set('sortBy', 'title')
            .set('sortOrder', this.data.titleSort)

        this.data.group ? this.getBirthdaysData(this.data.group.id) : this.getBirthdaysData(undefined)
    }

    sortRemindersByDate() {
        this.data.dateSort = sortOrderMap[this.data.dateSort]

        this.data.params = this.data.params
            .set('sortBy', 'birthday_date')
            .set('sortOrder', this.data.dateSort)

        this.data.group ? this.getBirthdaysData(this.data.group.id) : this.getBirthdaysData(undefined)
    }

    getGroupById(id: number) {
        this.groupService.getGroup(id).subscribe({
            next: response => {
                this.data.group = response
                this.data.pageTitle = response.name
            },
            error: () => this.router.navigate(['/birthdays/list']),
        })
    }

    private handleRouteParams(params: any): void {
        const id = params['id']
        id !== undefined ? this.getGroupById(id) : (this.data.pageTitle = 'All reminders')
        this.getBirthdays(id)
    }
}
