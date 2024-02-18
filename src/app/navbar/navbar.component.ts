import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private auth: AuthService) {}

  loggedIn() {
    return this.auth.loggedIn()
  }
  
  logout() {
    this.auth.logoutUser()
  }
}
