import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public pageTitle = 'Welcome'
  public name: string = ''
  public email: string = ''

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
    this.auth.getCurrentUser().subscribe({
      next: (user: any) => {
        this.name = user.name
        this.email = user.email
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}
