import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(user: any) {
    debugger;
    const currentUser = this.authService.login(user.email, user.password);
    if (currentUser) {
      this.authService.currentLoggedInUser = currentUser;
      this.router.navigate(['/'])
    }
  }
}
