import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isMobileMenuOpenned: boolean = false;

  constructor(private auth: AuthService) {}

  public loggedIn(): boolean {
    return this.auth.loggedIn()
  }

  public logout(): void {
    this.auth.logoutUser()
  }

  public toggleMobileMenu(state?: boolean): void {
    this.isMobileMenuOpenned =
      state !== undefined ? state : !this.isMobileMenuOpenned;
  }
}
