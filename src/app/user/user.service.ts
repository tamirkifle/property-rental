import { Injectable } from '@angular/core';
import { User } from './user';

import { Observable, of } from 'rxjs';
import { FirebaseService } from '../firebase.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebaseService: FirebaseService) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: LOG

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUsers(): Observable<User[]> {
    return this.firebaseService.getUsers();
  }

  getUser(id: string): Observable<User> {
    return this.firebaseService.getUser(id);
  }

  updateUser(user, avatarFile?): Observable<any> {
    return this.firebaseService.updateUser(user, avatarFile);
  }

}
