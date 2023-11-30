import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { IBirthday } from "./birthday";

@Injectable({
    providedIn: 'root'
})
export class BirthdayService {
    private listBirthdaysUrl = 'http://localhost:8000/api/birthdays'
    private createBirthdayUrl = "http://localhost:8000/api/birthdays"
    private editBirthdayUrl = "http://localhost:8000/api/birthdays/"
    private deleteBirthdayUrl = "http://localhost:8000/api/birthdays/"
    private listArchivedBirthdaysUrl = "http://localhost:8000/api/archived-birthdays"
    private restoreBirthdayUrl = "http://localhost:8000/api/restore-birthday/"

    constructor(private http: HttpClient) {
    }

    getBirthdays(): Observable<IBirthday[]> {
        return this.http.get<IBirthday[]>(this.listBirthdaysUrl).pipe(
            catchError(err => this.handleErrors(err))
        );
    }

    createBirthday(birthday: any) {
        return this.http.post<any>(this.createBirthdayUrl, birthday)
    }
  
    editBirthday(birthday: any, id: number | undefined) {
        return this.http.put<any>(this.editBirthdayUrl + id, birthday)
    }
  
    deleteBirthday(birthday: any) {
        return this.http.delete<any>(this.deleteBirthdayUrl + birthday.id, birthday)
    }

    getArchivedBirthdays(): Observable<IBirthday[]> {
        return this.http.get<IBirthday[]>(this.listArchivedBirthdaysUrl).pipe(
            catchError(err => this.handleErrors(err))
        );
    }
  
    restoreBirthday(birthday: any) {
        return this.http.post<any>(this.restoreBirthdayUrl + birthday.id, birthday)
    }


    private handleErrors(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}; error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}