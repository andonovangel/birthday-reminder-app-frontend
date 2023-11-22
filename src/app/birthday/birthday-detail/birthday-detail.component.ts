import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBirthday } from '../birthday';
import { BirthdayService } from '../birthday.service';
import * as birthdaysData from 'src/api/birthdays/birthdays.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-birthday-detail',
  templateUrl: './birthday-detail.component.html',
  styleUrls: ['./birthday-detail.component.scss']
})
export class BirthdayDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Birthday Details';
  birthday: IBirthday | undefined;
  birthdays: IBirthday[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  constructor(private birthdayService: BirthdayService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.pageTitle += `: ${id}`;

    this.sub = this.birthdayService.getBirthdays().subscribe({
      next: birthdays => {
          this.birthdays = birthdays;
          this.birthday = birthdays.find(x => x.id === id)
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/birthdays/list']);
  }
}
