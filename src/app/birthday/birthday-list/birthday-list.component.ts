import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { IBirthday } from "../birthday";
import { BirthdayService } from "../birthday.service";
import { IGroup } from "src/app/group/group";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BirthdayDetailComponent } from "../birthday-detail/birthday-detail.component";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { GroupService } from "src/app/group/group.service";

@Component({
    templateUrl: './birthday-list.component.html',
    styleUrls: ['./birthday-list.component.scss']
})
export class BirthdayListComponent implements OnInit, OnDestroy {
    public pageTitle: string = 'All Reminders'
    public errorMessage: string = ''

    private getBirthdaysSub?: Subscription
    private getGroupsSub?: Subscription
    private deleteBirthdaySub?: Subscription
    private birthdayObservableSub?: Subscription

    public filteredBirthdays: IBirthday[] = []
    public birthdays: IBirthday[] = []
    public group?: IGroup
    
    public params?: HttpParams

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
        private groupService: GroupService,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.birthdayObservableSub = this.birthdayService.birthdays$.subscribe(updatedBirthdays => {
            this.birthdays = updatedBirthdays
            this.filteredBirthdays = updatedBirthdays
        })

        this.route.params.subscribe(params => {
            this.handleRouteParams(params)
        })
    }

    ngOnDestroy(): void {
        this.getBirthdaysSub?.unsubscribe()
        this.getGroupsSub?.unsubscribe()
        this.deleteBirthdaySub?.unsubscribe()
        this.birthdayObservableSub?.unsubscribe()
    }
    
    performFilter(filterBy: string): IBirthday[] {
        filterBy = filterBy.toLocaleLowerCase()
        return this.birthdays.filter((birthday: IBirthday) =>
            birthday.title.toLocaleLowerCase().includes(filterBy))
    }

    private handleRouteParams(params: any): void {
        const id = params['id']
        id !== undefined ? this.getGroupById(id) : null
        this.getBirthdays(id)
    }

    getBirthdays(id?: number): void {
        const observable = (id !== undefined) ?
            this.groupService.getBirthdaysByGroup(id, this.params) :
            this.birthdayService.getBirthdays(this.params)

        this.getBirthdaysSub = observable.subscribe({
            next: birthdays => {
                this.birthdays = birthdays
                this.filteredBirthdays = this.birthdays
            },
            error: err => this.errorMessage = err,
        })
    }

    getGroupById(id: number) {
        this.groupService.getGroup(id).subscribe({
            next: response => {
                this.group = response
                this.pageTitle = response.name
            },
            error: () => this.router.navigate(['/birthdays/list']),
        })
    }

    deleteBirthday(birthday: IBirthday) {
      this.deleteBirthdaySub = this.birthdayService.deleteBirthday(birthday).subscribe({
        next: res => {
          console.log(res)
          this.isOptionVisible = false
        },
        error: err => console.log(err)
      })
    }

    @ViewChild('reminderSearch') reminderSearch?: ElementRef
    focusInput() {
        this.reminderSearch?.nativeElement.focus();
    }

    openModal(birthday: IBirthday) {
        const modalRef = this.modalService.open(BirthdayDetailComponent, {
            modalDialogClass: 'custom-modal', 
            centered: true, 
            size: 'lg' 
        })
        modalRef.componentInstance.birthday = birthday
        modalRef.componentInstance.group = this.group
    }

    public isOptionVisible: boolean = false
    public optionBirthday?: IBirthday
    toggleReminderOptions(event: Event, birthday: IBirthday) {
        event.stopPropagation()
        this.toggle()
        this.optionBirthday = birthday
    }

    toggle() {
        this.isOptionVisible = !this.isOptionVisible
    }

    private titleSort: string = 'asc'
    sortRemindersByTitle() {
        this.params = new HttpParams().set('sortBy', 'title').set('sortOrder', this.titleSort)
        this.group ? this.getBirthdays(this.group.id) : this.getBirthdays(undefined)
        this.titleSort = this.titleSort === 'asc' ? 'desc' : 'asc'
    }

    private dateSort: string = 'asc'
    sortRemindersByDate() {
        this.params = new HttpParams().set('sortBy', 'birthday_date').set('sortOrder', this.dateSort)
        this.group ? this.getBirthdays(this.group.id) : this.getBirthdays(undefined)
        this.dateSort = this.dateSort === 'asc' ? 'desc' : 'asc'
    }
}