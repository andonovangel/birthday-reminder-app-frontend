import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public pageTitle = 'Welcome'
  public name: string = JSON.parse(localStorage.getItem('user') || '{}').name
  public email: string = JSON.parse(localStorage.getItem('user') || '{}').email

  constructor (private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: user => {
        if (user) {
          this.name = user.name
          this.email = user.email

          if (user.name != undefined)
            localStorage.setItem('name', user.name)

          if (user.email != undefined)
            localStorage.setItem('email', user.email)
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
