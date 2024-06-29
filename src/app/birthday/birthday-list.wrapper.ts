import { HttpParams } from "@angular/common/http"
import { Subscription } from "rxjs"
import { IGroup } from "../group/group"
import { IBirthday } from "./birthday"

export class BirthdayListWrapper {
    public pageTitle: string = '';
    public errorMessage: string = '';

    public getBirthdaysSub?: Subscription;
    public getBirthdaysDataSub?: Subscription;
    public getGroupsSub?: Subscription;
    public birthdayObservableSub?: Subscription;

    public filteredBirthdays: IBirthday[] = [];
    public birthdays: IBirthday[] = [];
    public group?: IGroup;
    
    public params = new HttpParams();

    public _listFilter: string = '';
    
    public titleSort: string = 'none';
    public dateSort: string = 'none';
    
    public listFilter: string = '';
    public timeout: any;
}