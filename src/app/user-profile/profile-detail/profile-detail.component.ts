import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../user';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  public user?: IUser
  private getUserSub?: Subscription

  constructor (private auth: AuthService, private userService: UserProfileService) {}

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      this.user = window.userData
    }
  }

  ngOnDestroy(): void {
    this.getUserSub?.unsubscribe()
  }

  logoutUser() {
    this.auth.logoutUser()
  }
}
