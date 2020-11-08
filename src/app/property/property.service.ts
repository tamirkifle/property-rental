import { Injectable } from '@angular/core';
import { Property, PropertyOptions } from './property';
// import { MOCKPROPERTIES } from './mock-properties';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FilterByPipe } from '../shared/filter-by.pipe';
import { PropertyFilterPipe } from '../shared/property-filter.pipe';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  allFilterOptions = [];
  private propertiesURL = 'api/properties';  // URL to property web api
  private usersURL = 'api/users';  // URL to users web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fsdb: AngularFirestore,
  ) { }

  getProperties(options?: PropertyOptions): Observable<Property[]> {
    if (options) {
      let params = new HttpParams();
      if (options.search) {
        params = params.append('s', options.search);
      }
      if (options.filterBy && options.filterBy.length !== 0) {
        options.filterBy.forEach(filter => params = params.append('by', filter));
      }
      return this.http.get<Property[]>(this.propertiesURL, { params });

    }
    // [{
    //   id: '12',
    //   username: 'mahletg',
    //   contact: {email: 'mahletg@gmail.com', phone: null},
    //   // password: '1234',
    //   firstname: 'Mahlet',
    //   lastname: 'Getachew',
    //   avatar: 'assets/lady-avatars/lady-3.jpg',
    //   posts: ['12'],
    //   rating: 3.2,
    // },
    // {
    //   id: '13',
    //   username: 'mesimesi',
    //   contact: {email: 'mesimesi@gmail.com', phone: null},
    //   // password: '1234',
    //   firstname: 'Meseret',
    //   lastname: 'Leykun',
    //   avatar: 'assets/lady-avatars/lady-4.jpg',
    //   posts: ['13'],
    //   rating: 3.6,
    // },
    // {
    //   id: '14',
    //   username: 'allhouseset',
    //   contact: {email: 'allhouseset@gmail.com', phone: null},
    //   // password: '1234',
    //   firstname: 'AllHouse',
    //   lastname: 'Ethiopia',
    //   avatar: 'assets/guy-avatars/guy-2.jpg',
    //   posts: ['17'],
    //   rating: 5,
    //   isAdmin: true,
    // }].forEach(prop => this.fsdb.collection("users").add(prop)
    //   .then(function (docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function (error) {
    //     console.error("Error adding document: ", error);
    //   }));
    return this.fsdb.collection('properties').get().pipe(
      map(snapshot => snapshot.docChanges()),
      map(values => {
        return values.map(value => {
          const data: any = value.doc.data();
          console.log(data);
          return {
            id: value.doc.id as string,
            ...data,

          } as Property;
        });
      }),
      catchError(this.handleError<Property[]>(`getProperties`)),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: LOG

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProperty(id: string): Observable<Property> {
    return this.fsdb.collection('properties').doc(id).get().pipe(
      tap(snapshot => console.log(snapshot.data())),
      map(snapshot => snapshot.data()),
      map(data => {
        return {
          id,
          ...data,


        } as Property;
      }));

    // const url = `${this.propertiesURL}/${id}`;
    // return this.http.get<Property>(url).pipe(
    //   catchError(this.handleError<Property>(`getProperty id=${id}`))
    // );
  }

  addProperty(createdProperty) {
    return this.http
      .post(this.propertiesURL, createdProperty);
  }

  updateProperty(editedProperty) {
    console.log('in update property:', editedProperty);
    return this.http
      .put(this.propertiesURL, editedProperty);
  }

  likeProperty(propertyId) {
    if (!this.authService.currentUser.favorites) {
      this.authService.currentUser.favorites = [];
    }
    this.authService.currentUser.favorites.push(propertyId);
    return this.http.put(this.usersURL, this.authService.currentUser);
  }
  unlikeProperty(propertyId) {
    this.authService.currentUser.favorites = this.authService.currentUser.favorites.filter(id => id !== propertyId);
    return this.http.put(this.usersURL, this.authService.currentUser);
  }

  deleteProperty(property) {
    const id = typeof property === 'number' ? property : property.id;
    const url = `${this.propertiesURL}/${id}`;
    return this.http.delete<Property>(url, this.httpOptions);
  }

  getRelatedProperties(id) {
    // NOT IMPLEMENTED: get all realted properties to property
    return this.getProperties()
      .pipe(
        take(6)
      );
  }
}
