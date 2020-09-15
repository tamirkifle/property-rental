import { Injectable } from '@angular/core';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;
  isLoggedIn = false;

  constructor() { }

  login(userName: string, password: string): void {
    if (userName === 'hello' && password === 'hello'){
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
