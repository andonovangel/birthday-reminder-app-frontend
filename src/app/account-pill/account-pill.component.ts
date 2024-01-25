import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../user-profile/user';

@Component({
  selector: 'account-pill',
  templateUrl: './account-pill.component.html',
  styleUrls: ['./account-pill.component.scss']
})
export class AccountPillComponent implements OnInit {
  public user?: IUser

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.loggedIn()) {
      this.user = window.userData
    }
  }

  logoutUser() {
    this.auth.logoutUser()
  }
}
