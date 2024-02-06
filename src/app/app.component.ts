import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('shiftAnimation', [
      state('open', style({ marginLeft: '307px' })),
      transition('closed <=> open', animate('0.5s ease')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  public pageTitle: string = 'Birthday Reminder'
  public sidebarToggle: boolean = false

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.auth$.subscribe(isLoggedIn => {
      this.sidebarToggle = this.sidebarToggle && isLoggedIn ? true : false
    })
  }

  getUserRole() {
    return window.userData.role
  }

  loggedIn() {
    return this.auth.loggedIn()
  }

  isSidebarExpanded(toggle: boolean) {
    this.sidebarToggle = toggle
  }
}
