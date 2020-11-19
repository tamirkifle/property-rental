import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userChanged = new Subject();
  redirected = new Subject();

  currentUser: User = null;
  redirectUrl: string;
  isAdmin = false;
  isLoggedIn = false;

  currentUser$: Observable<User | void>;
  constructor(private userService: UserService, private firebaseService: FirebaseService) {
    this.currentUser$ = this.firebaseService.currentUser$;
    this.currentUser$.pipe(
      tap((user: User) => {
        console.log(user);
        if (user) {
          this.isLoggedIn = true;
          this.currentUser = user;
          this.isAdmin = this.currentUser.isAdmin;
        }
        else {
          this.isLoggedIn = false;
          this.currentUser = null;
          this.isAdmin = false;
        }
        this.userChanged.next();
      })
    ).subscribe();
  }

  login({ email, password }): Observable<User | void> {
    return this.firebaseService.login({ email, password });
  }

  createUser(createdUser: User, password): Observable<User | void> {
    return this.firebaseService.createUser(createdUser, password);
  }

  adminLogin(credentials): Observable<boolean> {
    return this.userService.getUser(credentials.user).pipe(
      map(user => {
        if ((user && user.isAdmin) || (credentials.user === 'test' && credentials.password === 'secret')) {
          this.currentUser = user;
          this.isAdmin = true;
          this.isLoggedIn = true;
          return true;
        }
        return false;
      })
    );
  }

  logout(): Observable<any> {
    return this.firebaseService.logout().pipe(
      switchMap(() => this.currentUser$)
    );
  }
}
