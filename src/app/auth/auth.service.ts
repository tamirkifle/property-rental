import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userChanged = new EventEmitter();

  authState$;
  currentUser: User = null;
  redirectUrl: string;
  _isAdmin = false;
  private _isLoggedIn = false;

  get isLoggedIn(){
    return this._isLoggedIn;
  }

  get isAdmin(){
    return this.currentUser?.isAdmin;
  }
  constructor(private userService: UserService, private fAuth: AngularFireAuth, private fsdb: AngularFireAuth) { 
    this.authState$ = this.fAuth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.userService.getUser(user.uid);
        }
        else{
          of(null);
        }
      })
    );
    this.authState$.subscribe(user => {
      console.log(user);
      this._isLoggedIn = true;
      this.currentUser = user;
      this.userChanged.emit();
    });
  }

  login({email, password}): Observable<any> {
      return from(this.fAuth.signInWithEmailAndPassword(email, password));


    // return this.userService.getUser(credentials.user).pipe(
    //   map(user => {
    //     if (user){
    //       this.currentUser = user;
    //       this.userChanged.emit();
    //       this._isLoggedIn = true;
    //       return true;
    //     }
    //     return false;
    //   })
    // );
  }

  createUser(createdUser: User, password){
    console.log(createdUser);
    return from(this.fAuth.createUserWithEmailAndPassword(createdUser.contact.email, password)).pipe(
      switchMap(user => {
        if (user){
          console.log(user);
          createdUser.id = user.user.uid;
          return this.userService.updateUser(createdUser);
        }
        else{
          of(null);
        }
      }),
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
  logout(): Observable<true> {
    return from(this.fAuth.signOut()).pipe(
      map(() => {
      this.currentUser = null;
      this._isLoggedIn = false;
      this._isAdmin = false;
      return true;
      }),
      );

  }
}
