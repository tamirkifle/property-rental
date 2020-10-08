import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;
  redirectUrl: string;
  _isAdmin = false;
  private _isLoggedIn = false;

  get isLoggedIn(){
    return this._isLoggedIn;
  }

  get isAdmin(){
    return this._isLoggedIn;
  }
  constructor(private userService: UserService) { }

  login(credentials: {user: string, password: string}): Observable<boolean> {
    return this.userService.getUser(credentials.user).pipe(
      map(user => {
        if (user || (credentials.user === 'test' && credentials.password === 'secret')){
          this.currentUser = user;
          this._isLoggedIn = true;
          return true;
        }
        return false;
      })
    );
  }
  adminLogin(credentials){
    return this.userService.getUser(credentials.user).pipe(
      map(user => {
        if ((user && user.isAdmin) || (credentials.user === 'test' && credentials.password === 'secret')){
          this.currentUser = user;
          this._isAdmin = true;
          this._isLoggedIn = true;
          return true;
        }
        return false;
      })
    );
  }
  logout(): void {
    this.currentUser = null;
    this._isLoggedIn = false;
    this._isAdmin = false;
  }
}
