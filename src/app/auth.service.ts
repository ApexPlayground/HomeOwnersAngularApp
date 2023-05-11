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
      password: 'Test@123',
      expert: true,
    },
    {
      id: 2,
      name: 'Tom',
      email: 't@t.com',
      password: 'Test123',
      expert: false,
    },
    {
      id: 3,
      name: 'Sam',
      email: 's@s.com',
      password: 'Test123',
      expert: false,
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

  get currentLoggedInAdmin(): any {
    return this._logoggedUser.expert;
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
      password,
      expert: false,
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
