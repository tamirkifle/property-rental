import { Injectable } from '@angular/core';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;
  private _isLoggedIn = false;

  get isLoggedIn(){
    return this._isLoggedIn;
  }
  constructor() { }

  login(credentials: {user: string, password: string}): void {
    if (credentials.user === 'test' && credentials.password === 'secret'){
      this._isLoggedIn = true;
    }
  }

  logout(): void {
    this._isLoggedIn = false;
  }
}
