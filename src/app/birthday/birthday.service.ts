import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { IBirthday } from "./birthday";

@Injectable({
    providedIn: 'root'
})
export class BirthdayService {
    private listBirthdaysUrl = 'http://127.0.0.1:8000/api/birthdays'
    private createBirthdayUrl = "http://127.0.0.1:8000/api/birthdays"
    private editBirthdayUrl = "http://127.0.0.1:8000/api/birthdays/"

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
  
    editBirthday(birthday: any) {
      return this.http.put<any>(this.editBirthdayUrl + birthday.id, birthday)
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