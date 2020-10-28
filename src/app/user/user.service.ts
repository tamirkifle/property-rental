import { Injectable, EventEmitter } from '@angular/core';
import { User } from './user';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  profileChanged = new EventEmitter();
  private usersURL = 'api/users';

  constructor(private http: HttpClient) { }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: LOG

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersURL)
    .pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  getUser(username): Observable<User>{
    return this.getUsers().pipe(
      map(users => users.find(user => user.username === username))
    );
  }

  updateUser(user, avatarFile?){
    var fd = new FormData();
    if (avatarFile){
      fd.append('image', avatarFile);
    }
    fd.append('user', user);

    //change to fd
    return this.http.put(this.usersURL, user);
  }

  addUser(user, password){
    var fd = new FormData();
    fd.append('password', password);
    fd.append('user', user);

    //change to fd
    return this.http.post(this.usersURL, user);
  }

}
