import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _loggedInUser: any;
  userKey: string = 'User';
  users: any = [
    {
      id: 1,
      name: 'Jerry',
      email: 'j@j.com',
      password: 'root',
      expert: true,
      isAdminUser: false
    },
    {
      id: 2,
      name: 'Tom',
      email: 't@t.com',
      password: 'test',
      expert: false,
      isAdminUser: false
    },
    {
      id: 3,
      name: 'Sam',
      email: 's@s.com',
      password: 'Test123',
      expert: false,
      isAdminUser: false
    },
    {
      id: 4,
      name: 'div',
      email: 'a@a.com',
      password: 'admin',
      isAdminUser: true,
      expert: true
    }
  ];

  get currentLoggedInUser(): any {
    return this._loggedInUser;
  }

  get currentLoggedInExpert(): any {
    return this._loggedInUser ? this._loggedInUser.expert : false;
  }

  get currentLoggedInAdmin(): any {
    return this._loggedInUser ? this._loggedInUser.isAdminUser : false;
  }

  set currentLoggedInUser(value: any) {
    this._loggedInUser = value;
  }

  constructor() { }

  getUser(userId: number) {
    return this.users.find((user: any) => user.id === userId);
  }

  getUserEquals(userId: number) {
    return this.currentLoggedInUser && this.currentLoggedInUser.id === userId;
  }

  addUser(name: string, email: string, password: string) {
    const newUserId = this.users.length + 1;
    this.users.push({
      id: newUserId,
      name,
      email,
      password,
      expert: false
    });
    return true;
  }

  login(email: string, password: string) {
    const user = this.users.find(
      (user: any) => user.email === email && user.password === password
    );
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentLoggedInUser = user;
    return user;
  }

  logout() {
    this.currentLoggedInUser = undefined;
    localStorage.removeItem(this.userKey);
  }
}
