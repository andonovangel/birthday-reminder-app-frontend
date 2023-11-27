import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { IUser } from '../user-profile/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public pageTitle = 'Welcome'
  public user?: IUser

  public getUserFromApiSub?: Subscription

  constructor (private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      this.getUserFromApiSub = this.auth.getUserFromApi().subscribe({
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
    this.getUserFromApiSub?.unsubscribe()
  }
}
