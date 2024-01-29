import { Component } from '@angular/core';
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
export class AppComponent{
  public pageTitle: string = 'Birthday Reminder'
  public sidebarToggle: boolean = false

  constructor(private auth: AuthService) {}

  getUserRole() {
    return window.userData.role
  }

  getAuthService() {
    return this.auth
  }

  isSidebarExpanded(toggle: boolean) {
    this.sidebarToggle = toggle
  }
}
