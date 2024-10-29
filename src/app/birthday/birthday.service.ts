import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, Subject } from "rxjs";
import { IBirthday } from "./birthday";

@Injectable({
    providedIn: 'root'
})
export class BirthdayService {
    private listBirthdaysUrl = 'http://localhost:8000/api/birthdays'
    private showBirthdayUrl = 'http://localhost:8000/api/birthdays/'
    private createBirthdayUrl = 'http://localhost:8000/api/birthdays'
    private editBirthdayUrl = 'http://localhost:8000/api/birthdays/'
    private deleteBirthdayUrl = 'http://localhost:8000/api/birthdays/'
    private listArchivedBirthdaysUrl = 'http://localhost:8000/api/archived-birthdays'
    private restoreBirthdayUrl = 'http://localhost:8000/api/restore-birthday/'

    private sendEmailUrl = 'http://localhost:8000/api/send-email'

    private birthdaysSubject: Subject<IBirthday[]> = new Subject<IBirthday[]>()
    public birthdays$: Observable<IBirthday[]> = this.birthdaysSubject.asObservable()

    private archivedBirthdaysSubject: Subject<IBirthday[]> = new Subject<IBirthday[]>()
    public archivedBirthdays$: Observable<IBirthday[]> = this.archivedBirthdaysSubject.asObservable()

    constructor(private http: HttpClient) {}

    getBirthdays(): Observable<IBirthday[]> {
        return this.getBirthdaysData()
        .pipe(
            tap((birthdays: IBirthday[]) => {
                this.birthdaysSubject.next(birthdays)
            })
        )
    }

    getBirthdaysData(params?: HttpParams): Observable<IBirthday[]> {
        return this.http.get<IBirthday[]>(this.listBirthdaysUrl, {
            withCredentials: true,
            params: params
        })
    }

    getBirthday(id: number): Observable<IBirthday> {
      return this.http.get<IBirthday>(this.showBirthdayUrl + id, { withCredentials: true })
    }

    createBirthday(birthday: IBirthday): Observable<IBirthday> {
        return this.http.post<IBirthday>(this.createBirthdayUrl, birthday, { withCredentials: true })
    }

    editBirthday(birthday: IBirthday, id?: number): Observable<IBirthday> {
        return this.http.put<IBirthday>(this.editBirthdayUrl + id, birthday, { withCredentials: true })
    }

    deleteBirthday(birthday: IBirthday): Observable<IBirthday> {
        return this.http.delete<IBirthday>(this.deleteBirthdayUrl + birthday.id, {
            withCredentials: true
        })
        .pipe(
            tap(() => {
                this.getBirthdays().subscribe()
                this.getArchivedBirthdays().subscribe()
            })
        )
    }

    getArchivedBirthdays(): Observable<IBirthday[]> {
        return this.http.get<IBirthday[]>(this.listArchivedBirthdaysUrl, {
            withCredentials: true
        })
        .pipe(
            tap((archivedBirthdays: IBirthday[]) => {
                this.archivedBirthdaysSubject.next(archivedBirthdays)
            })
        )
    }

    restoreBirthday(birthday: IBirthday): Observable<IBirthday> {
        return this.http.post<IBirthday>(this.restoreBirthdayUrl + birthday.id, birthday, {
            withCredentials: true
        })
        .pipe(
            tap(() => {
              this.getBirthdays().subscribe()
              this.getArchivedBirthdays().subscribe()
            })
        )
    }

    sendEmail(birthday: IBirthday): Observable<any> {
        return this.http.post<any>(this.sendEmailUrl, birthday, { withCredentials: true })
    }
}
