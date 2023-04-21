import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _logoggedUser: any;
  userKey: string = 'User';
  users: any = [
    {
      id: 1,
      name: 'Jerry',
      email: 'j@j.com',
      password: 'Test@123'
    },
    {
      id: 2,
      name: 'Tom',
      email: 't@t.com',
      password: 'Test123'
    },
    {
      id: 3,
      name: 'Sam',
      email: 's@s.com',
      password: 'Test123'
    }
  ]

  get currentLoggedInUser(): any {
    return this._logoggedUser;
  }

  set currentLoggedInUser(value: any) {
    if (value) {
      this._logoggedUser = value
    }
  }


  constructor() { }

  getUser(userId: number) {
    return this.users.find((user: any) => user.id === userId);
  }

  addUser(name: string, email: string, password: string) {
    const newUserId = this.users.length + 1;
    this.users.push({
      id: newUserId,
      name,
      email,
      password
    });
    return true;
  }

  login(email: string, password: string) {
    const user = this.users.find((user: any) => user.email === email && user.password === password);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    return user;
  }

  logout() {
    this._logoggedUser = undefined;
    localStorage.removeItem(this.userKey);
  }
}
