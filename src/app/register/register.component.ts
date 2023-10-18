import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerUserData: any = {}

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  registerUser() {
    this.auth.registerUser(this.registerUserData).subscribe({
      next: res => {
        console.log(res)
        this.router.navigate(['/welcome'])
      },
      error: err => {
        console.log(err)
      },
    })
  }
}
