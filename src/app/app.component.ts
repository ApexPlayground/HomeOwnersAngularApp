import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { filterItems } from '../assets/search-function';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AskMe';
  user: any;
  searchTerm: string = "";
  items = ['How to ride a bike', 'How to play a guitar'];
  filteredItems: string[] = [];

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.currentLoggedInUser) {
      const userJson: any = localStorage.getItem(this.authService.userKey);
      try {
        const user = JSON.parse(userJson);
        this.authService.currentLoggedInUser = user;
      } catch (error) {
        localStorage.removeItem(this.authService.userKey);
      }
    }
    this.user = this.authService.currentLoggedInUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }

  searchItems() {
    this.filteredItems = filterItems(this.items, this.searchTerm);
  }




}

