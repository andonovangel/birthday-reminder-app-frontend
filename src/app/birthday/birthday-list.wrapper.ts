import { HttpParams } from "@angular/common/http"
import { Subscription } from "rxjs"
import { IGroup } from "../group/group"
import { IBirthday } from "./birthday"

export class BirthdayListWrapper {
    public pageTitle: string = 'All Reminders'
    public errorMessage: string = ''

    public getBirthdaysSub?: Subscription
    public getGroupsSub?: Subscription
    public deleteBirthdaySub?: Subscription
    public birthdayObservableSub?: Subscription

    public filteredBirthdays: IBirthday[] = []
    public birthdays: IBirthday[] = []
    public group?: IGroup
    
    public params?: HttpParams

    public _listFilter: string = ''
    
    public isOptionVisible: boolean = false
    public optionBirthday?: IBirthday
    
    public titleSort: string = 'asc'
    public dateSort: string = 'asc'
}