import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { IBirthday } from "../birthday";
import { BirthdayService } from "../birthday.service";
import { IGroup } from "src/app/group/group";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BirthdayDetailComponent } from "../birthday-detail/birthday-detail.component";
import { ActivatedRoute, Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    templateUrl: './birthday-list.component.html',
    styleUrls: ['./birthday-list.component.scss'],
    animations: [
        trigger('options', [
            state('open', style({
              height: '*',
              opacity: 1,
            })),
            state('closed', style({
              height: '0',
              opacity: 0,
            })),
            transition('open => closed', animate('200ms ease-out')),
            transition('closed => open', animate('200ms ease-in')),
        ]),
    ]
})
export class BirthdayListComponent implements OnInit, OnDestroy {
    public pageTitle: string = 'All Reminders'
    public errorMessage: string = ''

    private getBirthdaysSub?: Subscription
    private getGroupsSub?: Subscription
    private deleteBirthdaysSub?: Subscription

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
    

    @ViewChild('toggleButton') toggleButton?: ElementRef
    @ViewChild('options') options?: ElementRef

    constructor(
        private birthdayService: BirthdayService,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private renderer: Renderer2
    ) {
        this.renderer.listen('window', 'click', (e: Event)=>{
           if (e.target !== this.toggleButton?.nativeElement && e.target !== this.options?.nativeElement){
               this.isOptionVisible = false;
           }
       });
    }

    ngOnInit(): void {
        this.getBirthdaysSub = this.getBirthdays()
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

    deleteBirthday(event: Event, birthday: IBirthday) {
        event.stopPropagation()
        if(confirm("Are you sure to delete " + birthday.name)) {
            this.deleteBirthdaysSub = this.birthdayService.deleteBirthday(birthday).subscribe({
            next: res => {
                console.log(res)
                
                // Refreshes component
                this.router.routeReuseStrategy.shouldReuseRoute = () => false
                this.router.onSameUrlNavigation = 'reload'
                this.router.navigate(['./'], { relativeTo: this.route, queryParamsHandling: "merge" })
            },
            error: err => {
                console.log(err)
            }
            })
        }
    }

    @ViewChild('myInput') myInput: ElementRef = {} as ElementRef
    focusInput() {
        this.myInput.nativeElement.focus();
    }




    openModal(birthday: IBirthday) {
        const modalRef = this.modalService.open(BirthdayDetailComponent, {
            modalDialogClass: 'custom-modal', 
            centered: true, 
            size: 'lg' 
        })
        modalRef.componentInstance.birthday = birthday
    }

    public isOptionVisible: boolean = false
    public optionBirthday?: IBirthday
    openReminderOptions(event: Event, birthday: IBirthday) {
        event.stopPropagation()
        this.isOptionVisible = !this.isOptionVisible
        this.optionBirthday = birthday
    }
}