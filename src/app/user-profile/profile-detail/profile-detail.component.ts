import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../user';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  public user?: IUser
  private getUserFromApiSub?: Subscription

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
