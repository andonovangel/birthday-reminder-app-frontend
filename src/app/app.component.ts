import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
  public inPrivateRoute: boolean = false
  public publicRoutes: string[] = ['welcome']

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.auth.auth$.subscribe(isLoggedIn => {
      this.sidebarToggle = this.sidebarToggle && isLoggedIn ? true : false
    })

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path as string
        this.inPrivateRoute = !this.publicRoutes.includes(currentRoute)
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
