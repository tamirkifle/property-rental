import { Injectable } from '@angular/core';
import { Property, PropertyOptions } from './property';
// import { MOCKPROPERTIES } from './mock-properties';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  filterItems = {
    'city': ['Addis Ababa', 'Mekele', 'Arba Minch', 'Gondar', 'Bahir Dar'],
    'sub city': ['Kirkos', 'Bole', 'Lideta', 'Yeka'],
    'type': ['Apartment', 'Condominium', 'Full House', 'House Quarter'],
    'number of bedrooms': ['One Bedroom', 'Two Bedrooms', 'Three Bedrooms', '>3 Bedrooms'],
    'price range': ['<=2000', '2000-3000', '3000-5000', '>5000'],
  };
  allFilterOptions = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) {
    for (const key in this.filterItems) {
      if (this.filterItems.hasOwnProperty(key)) {
        this.filterItems[key].forEach(option => this.allFilterOptions.push(option));
      }
    }
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
      console.error(operation, error); // log to console instead

      // TODO: LOG

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProperties(options?: PropertyOptions): Observable<Property[]> {
    if (options && (options.search || options.filterBy?.length > 0)) {
      return this.firebaseService.getProperties(options, this.filterItems);
    }
    return this.firebaseService.getProperties();
  }



  getProperty(id: string): Observable<Property> {
    return this.firebaseService.getProperty(id);
  }

  addProperty(sentCreatedProperty: Property, images?): Subject<any> | Observable<any> {
    return this.firebaseService.addProperty(sentCreatedProperty, this.authService.currentUser, images);

  }

  updateProperty(editedProperty, images?, linksToRemove?: string[]): Subject<any> | Observable<any>{
    return this.firebaseService.updateProperty(editedProperty, images, linksToRemove);
  }

  getPostsForUser(userid: string): Observable<Property[]> {
    return this.firebaseService.getPostsForUser(userid);
  }

  likeProperty(propertyId): Observable<void> {

    if (!this.authService.currentUser.favorites) {
      this.authService.currentUser.favorites = [];
    }

    this.authService.currentUser.favorites.push(propertyId);
    return this.userService.updateUser(this.authService.currentUser);
  }

  unlikeProperty(propertyId): Observable<void> {

    this.authService.currentUser.favorites = this.authService.currentUser.favorites.filter(id => id !== propertyId);
    return this.userService.updateUser(this.authService.currentUser);

  }

  deleteProperty(property: Property): Observable<void> {
    return this.firebaseService.deleteProperty(property);
  }

  getRelatedProperties(id) {
    // NOT IMPLEMENTED: get all related properties
    return this.getProperties()
      .pipe(
        map(properties => {
          return properties.splice(0, 8).filter(p => p.id !== id);
        }),
      );
  }
}
