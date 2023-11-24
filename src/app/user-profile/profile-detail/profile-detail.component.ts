import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent {
  public name: string = ''
  public email: string = ''
  public created_at: string = ''

  constructor (private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: user => {
        if (user) {
          this.name = user.name
          this.email = user.email
          this.created_at = user.created_at

          // if (user.name != undefined)
          //   localStorage.setItem('name', user.name)

          // if (user.email != undefined)
          //   localStorage.setItem('email', user.email)

          //   if (user.created_at != undefined)
          //     localStorage.setItem('created_at', user.created_at)
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
