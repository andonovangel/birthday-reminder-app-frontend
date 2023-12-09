import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { IUser } from '../user-profile/user';
import { UserProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public pageTitle = 'Welcome'
  public user?: IUser

  public getUserSub?: Subscription

  constructor (private auth: AuthService, private userService: UserProfileService) {}

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      this.getUserSub = this.userService.getUser().subscribe({
        next: (user: any) => {
          this.user = user
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getUserSub?.unsubscribe()
  }
}
