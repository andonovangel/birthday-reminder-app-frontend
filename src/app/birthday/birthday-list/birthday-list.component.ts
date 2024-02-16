import { Component, OnDestroy, OnInit } from "@angular/core";
import { IBirthday } from "../birthday";
import { BirthdayService } from "../birthday.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BirthdayDetailComponent } from "../birthday-detail/birthday-detail.component";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { GroupService } from "src/app/group/group.service";
import { BirthdayListWrapper } from "../birthday-list.wrapper";

@Component({
    templateUrl: './birthday-list.component.html',
    styleUrls: ['./birthday-list.component.scss']
})
export class BirthdayListComponent implements OnInit, OnDestroy {
    public data = new BirthdayListWrapper()

    constructor(
        private birthdayService: BirthdayService,
        private groupService: GroupService,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
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
        this.data.getBirthdaysSub?.unsubscribe()
        this.data.getGroupsSub?.unsubscribe()
        this.data.deleteBirthdaySub?.unsubscribe()
        this.data.birthdayObservableSub?.unsubscribe()
    }

    getBirthdays(id?: number): void {
        const observable = (id !== undefined) ?
            this.groupService.getBirthdaysByGroup(id, this.data.params) :
            this.birthdayService.getBirthdays(this.data.params)

        this.data.getBirthdaysSub = observable.subscribe({
            next: birthdays => {
                this.data.birthdays = birthdays
                this.data.filteredBirthdays = this.data.birthdays
            },
            error: err => this.data.errorMessage = err,
        })
    }

    onSearchChange() {
        clearTimeout(this.data.timeout)
        
        if (this.data.listFilter.trim() !== '') {
            this.data.timeout = setTimeout(() => {
                console.log('In setter: ', this.data.listFilter)
                this.birthdayService.searchForBirthdays(this.data.listFilter).subscribe({
                    next: res => this.data.filteredBirthdays = res,
                    error: err => console.log(err)            
                })
            }, 300)
        }
        else {
            this.data.filteredBirthdays = this.data.birthdays
        }
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

    deleteBirthday(birthday: IBirthday) {
      this.data.deleteBirthdaySub = this.birthdayService.deleteBirthday(birthday).subscribe({
        next: res => {
          console.log(res)
          this.data.isOptionVisible = false
        },
        error: err => console.log(err)
      })
    }

    openModal(birthday: IBirthday) {
        const modalRef = this.modalService.open(BirthdayDetailComponent, {
            modalDialogClass: 'custom-modal', 
            centered: true, 
            size: 'lg' 
        })
        modalRef.componentInstance.birthday = birthday
        modalRef.componentInstance.group = this.data.group
    }

    toggleReminderOptions(event: Event, birthday: IBirthday) {
        event.stopPropagation()
        this.toggle()
        this.data.optionBirthday = birthday
    }

    toggle() {
        this.data.isOptionVisible = !this.data.isOptionVisible
    }

    sortRemindersByTitle() {
        this.data.params = new HttpParams().set('sortBy', 'title').set('sortOrder', this.data.titleSort)
        this.data.group ? this.getBirthdays(this.data.group.id) : this.getBirthdays(undefined)
        this.data.titleSort = this.data.titleSort === 'asc' ? 'desc' : 'asc'
    }

    sortRemindersByDate() {
        this.data.params = new HttpParams().set('sortBy', 'birthday_date').set('sortOrder', this.data.dateSort)
        this.data.group ? this.getBirthdays(this.data.group.id) : this.getBirthdays(undefined)
        this.data.dateSort = this.data.dateSort === 'asc' ? 'desc' : 'asc'
    }

    private handleRouteParams(params: any): void {
        const id = params['id']
        id !== undefined ? this.getGroupById(id) : null
        this.getBirthdays(id)
    }
}