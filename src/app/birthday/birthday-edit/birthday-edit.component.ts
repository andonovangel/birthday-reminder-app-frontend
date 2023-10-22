import { Component, OnDestroy, OnInit } from '@angular/core';
import { BirthdayService } from '../birthday.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBirthday } from '../birthday';

@Component({
  selector: 'app-birthday-edit',
  templateUrl: './birthday-edit.component.html',
  styleUrls: ['./birthday-edit.component.scss']
})
export class BirthdayEditComponent implements OnInit, OnDestroy {
  birthday: IBirthday | undefined;
  sub!: Subscription
  errorMessage: string = '';

  birthdayData = {
    id: 0,
    name: '',
    title: '',
    phone_number: '',
    body: '',
    birthday_date: '',
    group_id: null
  }

  constructor(
    private birthdayService: BirthdayService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.sub = this.birthdayService.getBirthdays().subscribe({
      next: birthdays => {
          this.birthday = birthdays.find(x => x.id === id)
          this.birthdayData = {
            id: id,
            name: this.birthday?.name || '',
            title: this.birthday?.title || '',
            phone_number: this.birthday?.phone_number || '',
            body: this.birthday?.body || '',
            birthday_date: this.birthday?.birthday_date || '',
            group_id: null
          }
      },
      error: err => this.errorMessage = err
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  editBirthday() {
    this.birthdayService.editBirthday(this.birthdayData).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(['/birthdays'])
      },
      error: err => {
        console.log(err)
      }
    })
  }

  onBack(): void {
    this.router.navigate(['/birthdays']);
  }
}
