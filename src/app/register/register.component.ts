import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {
    user: '',
    email: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(user: any) {
    debugger;
    this.authService.addUser(user.name, user.email, user.password);
    this.router.navigate(['/login']);
  }

}
