import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../user';
import { UserProfileService } from '../user-profile.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  animations: [
    trigger('options', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ]
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  public user?: IUser
  private getUserSub?: Subscription

  public isOptionVisible: boolean = false

  constructor (private auth: AuthService, private userService: UserProfileService) {}

  ngOnInit(): void {this.getUserSub = this.userService.getUser().subscribe({
    next: user => this.user = user,
    error: err => console.log(err)
  })
  }

  ngOnDestroy(): void {
    this.getUserSub?.unsubscribe()
  }

  logoutUser(): void {
    this.auth.logoutUser()
  }

  toggleOptionsVisibility(): void {
    this.isOptionVisible = !this.isOptionVisible
  }
}
