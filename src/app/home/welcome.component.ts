import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public pageTitle = 'Welcome'
  public name: string = ''
  public email: string = ''

  public getCurrentUserSub?: Subscription

  constructor (private auth: AuthService) {}

  ngOnInit(): void {
    // this.auth.getUserFromApi().subscribe({
    //     next: (user: any) => {
    //         this.name = user.name
    //         this.email = user.email
    //     },
    //     error: (err: any) => {
    //       console.log(err)
    //     }
    //   })
    this.getCurrentUserSub = this.auth.getCurrentUser().subscribe({
      next: (user: any) => {
        this.name = user.name
        this.email = user.email
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    this.getCurrentUserSub?.unsubscribe()
  }
}
