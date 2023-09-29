import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { IBirthday } from "./birthday";
import * as birthdayData from 'src/api/birthdays/birthdays.json';

@Injectable({
    providedIn: 'root'
})
export class BirthdayService {
    private data : IBirthday[] = [
        {
            id: 1,
            name: "Test 8",
            title: "test-8",
            phone_number: "123123123",
            body: "asdassdasd",
            birthday_date: "2024-09-04 06:28:00",
            user_id: 1,
            group_id: undefined
        },
        {
            id: 2,
            name: "Test 1",
            title: "test-1",
            phone_number: "123123123",
            body: "asdasdasd",
            birthday_date: "2024-09-04 06:28:00",
            user_id: 1,
            group_id: undefined
        },
        {
            id: 3,
            name: "Test 2",
            title: "test-2",
            phone_number: "123123123",
            body: "asdasdasd",
            birthday_date: "2024-09-04 06:28:00",
            user_id: 1,
            group_id: undefined
        },
        {
            id: 4,
            name: "Test 3",
            title: "test-3",
            phone_number: "123123123",
            body: "asdasdasd",
            birthday_date: "2024-09-04 06:28:00",
            user_id: 1,
            group_id: undefined
        }
    ]
    
    constructor(private http: HttpClient) {}

    getBirthdays(): IBirthday[] {
        return this.data
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