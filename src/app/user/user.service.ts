import { Injectable, EventEmitter } from '@angular/core';
import { User } from './user';

import { from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersURL = 'api/users';

  constructor(private http: HttpClient, private fsdb: AngularFirestore) { }
  
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
    // return this.http.get<User[]>(this.usersURL)
    // .pipe(
    //   catchError(this.handleError('getUsers', []))
    // );

    return this.fsdb.collection('users').get().pipe(
      map(snapshot => snapshot.docChanges()),
      map(values => {
        return values.map(value => {
          const data: any = value.doc.data();
          return {
            id: value.doc.id as string,
            ...data,


          } as User;
        });
      }),
      catchError(this.handleError<User[]>(`getProperties`)),
    );
  }

  getUser(id): Observable<User>{
    return this.fsdb.collection('users').doc(id).get().pipe(
      map(snapshot => snapshot.data()),
      map(data => {
        return {
          id,
          ...data,

        } as User;
      })
      
      );

    // return this.getUsers().pipe(
    //   map(users => users.find(user => user.username === id))
    // );
  }

  updateUser(user, avatarFile?){
    var fd = new FormData();
    if (avatarFile){
      fd.append('image', avatarFile);
    }
    fd.append('user', user);

    //change to fd
    return from(this.fsdb.collection('users').doc(user.id).set(user));
  }

  addUser(user, password){
    var fd = new FormData();
    fd.append('password', password);
    fd.append('user', user);

    //change to fd
    return this.http.post(this.usersURL, user);
  }

}
