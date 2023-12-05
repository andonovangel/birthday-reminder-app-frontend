import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { IBirthday } from "./birthday";

@Injectable({
    providedIn: 'root'
})
export class BirthdayService {
    private listBirthdaysUrl = 'http://localhost:8000/api/birthdays'
    private createBirthdayUrl = 'http://localhost:8000/api/birthdays'
    private editBirthdayUrl = 'http://localhost:8000/api/birthdays/'
    private deleteBirthdayUrl = 'http://localhost:8000/api/birthdays/'
    private listArchivedBirthdaysUrl = 'http://localhost:8000/api/archived-birthdays'
    private restoreBirthdayUrl = 'http://localhost:8000/api/restore-birthday/'

    constructor(private http: HttpClient) {}

    getBirthdays(): Observable<IBirthday[]> {
        return this.http.get<IBirthday[]>(this.listBirthdaysUrl, { withCredentials: true })
    }

    createBirthday(birthday: IBirthday) {
        return this.http.post<IBirthday>(this.createBirthdayUrl, birthday, { withCredentials: true })
    }
  
    editBirthday(birthday: IBirthday, id?: number) {
        return this.http.put<IBirthday>(this.editBirthdayUrl + id, birthday, { withCredentials: true })
    }
  
    deleteBirthday(birthday: IBirthday) {
        return this.http.delete<IBirthday>(this.deleteBirthdayUrl + birthday.id, { withCredentials: true })
    }

    getArchivedBirthdays(): Observable<IBirthday[]> {
        return this.http.get<IBirthday[]>(this.listArchivedBirthdaysUrl, { withCredentials: true })
    }
  
    restoreBirthday(birthday: IBirthday) {
        return this.http.post<IBirthday>(this.restoreBirthdayUrl + birthday.id, birthday, { withCredentials: true })
    }
}