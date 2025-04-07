import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent {
  @Output() closedMobileMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor(private auth: AuthService) {}

  public loggedIn(): boolean {
    return this.auth.loggedIn()
  }

  public logout(): void {
    this.auth.logoutUser()
  }

  closeMobileMenu(): void {
    this.closedMobileMenu.emit();
  }
}
