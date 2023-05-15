import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Mongoose } from 'mongoose';

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
    //The 'login' method of the 'authService' is called with the provided email and password.
    const currentUser = this.authService.login(user.email, user.password);
    // If a current user is returned from the 'login' method,it is assigned to the 'currentLoggedInUser' property of the 'authService'.
    if (currentUser) {
      this.authService.currentLoggedInUser = currentUser;
      this.router.navigate(['/'])
    }
  }
}
