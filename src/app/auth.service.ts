import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _loggedInUser: any;
  userKey: string = 'User';

  //essential users
  users: any = [
    {
      id: 1,
      name: 'Jerry',
      email: 'j@j.com',
      password: 'root',
      expert: true,
      isAdminUser: false,
    },
    {
      id: 2,
      name: 'Tom',
      email: 't@t.com',
      password: 'test',
      expert: false,
      isAdminUser: false,
    },
    {
      id: 3,
      name: 'Sam',
      email: 's@s.com',
      password: 'Test123',
      expert: false,
      isAdminUser: false,
    },
    {
      id: 4,
      name: 'div',
      email: 'a@a.com',
      password: 'admin',
      isAdminUser: true,
      expert: true,
    },
  ];

  // Getter for the currently logged in user
  get currentLoggedInUser(): any {
    return this._loggedInUser;
  }

  // Getter for checking if the currently logged in user is an expert
  get currentLoggedInExpert(): any {
    return this._loggedInUser ? this._loggedInUser.expert : false;
  }

  // Getter for checking if the currently logged in user is an admin user
  get currentLoggedInAdmin(): any {
    return this._loggedInUser ? this._loggedInUser.isAdminUser : false;
  }

  // Setter for setting the currently logged in user
  set currentLoggedInUser(value: any) {
    this._loggedInUser = value;
  }

  constructor() { }

  // Get a specific user by their ID
  getUser(userId: number) {
    return this.users.find((user: any) => user.id === userId);
  }

  // Check if a user ID is equal to the ID of the currently logged in user
  getUserEquals(userId: number) {
    return this.currentLoggedInUser && this.currentLoggedInUser.id === userId;
  }

  // Add a new user to the users array
  addUser(name: string, email: string, password: string) {
    const newUserId = this.users.length + 1;
    this.users.push({
      id: newUserId,
      name,
      email,
      password,
      expert: false,
    });
    return true;
  }

  // Perform user login
  login(email: string, password: string) {
    const user = this.users.find(
      (user: any) => user.email === email && user.password === password
    );
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentLoggedInUser = user;
    return user;
  }

  // Perform user logout
  logout() {
    this.currentLoggedInUser = undefined;
    localStorage.removeItem(this.userKey);
  }
}
