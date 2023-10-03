import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError, of } from "rxjs";
import { IBirthday } from "./birthday";

@Injectable({
    providedIn: 'root'
})
export class BirthdayService {
    
    private birthdayUrl = 'api/birthdays/birthdays.json'

    constructor(private http: HttpClient) {
    }

    getBirthdays(): Observable<IBirthday[]> {
        return this.http.get<IBirthday[]>(this.birthdayUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(err => this.handleErrors(err))
        );
    }

    private handleErrors(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is; ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}