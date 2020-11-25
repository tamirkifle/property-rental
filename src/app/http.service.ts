import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { User } from './user/user';
import { HttpClient } from '@angular/common/http';
import { getAllUsersURL, updateUserURL, createUserURL } from 'src/app/api';
import { getAllPropertiesURL, getPropertyBaseURL, createPropertyURL, updatePropertyURL, deletePropertyURL } from 'src/app/api';

import { getUserBaseURL } from './api';
import { map, finalize, switchMap } from 'rxjs/operators';
import { PropertyOptions, Property } from './property/property';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(getAllUsersURL);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${getUserBaseURL}/${id}`);
  }

  updateUser(user, avatarFile?): Observable<any> {
    const fd = new FormData();
    fd.append('user', JSON.stringify(user));
    if (avatarFile) {
      fd.append(`avatar`, avatarFile);
    }

    return this.http.put(updateUserURL, fd);
  }


  getProperties(options?: PropertyOptions, filterItems?): Observable<Property[]> {
    if (options && (options.search || options.filterBy?.length > 0)) {
      // UPDATE WITH FILTER AND SEARCH RESULTS API
      return this.http.get<Property[]>(getAllPropertiesURL);
    }
    return this.http.get<Property[]>(getAllPropertiesURL);
  }



  getProperty(id: string): Observable<Property> {
    return this.http.get<Property>(`${getPropertyBaseURL}/${id}`);
  }

  addProperty(sentCreatedProperty: Property, currentUser: User, images?): Observable<any> | Subject<any> {
    const done = new Subject();
    sentCreatedProperty.postCreator = currentUser.id;
    sentCreatedProperty.propertyImages = [];

    sentCreatedProperty.bedrooms > 3 ? sentCreatedProperty.fourPlus = true : sentCreatedProperty.fourPlus = false;
    if (sentCreatedProperty.price.amount >= 5000) {
      sentCreatedProperty.priceRange = '>5000';
    }
    else if (sentCreatedProperty.price.amount >= 3000) {
      sentCreatedProperty.priceRange = '3000-5000';
    }
    else if (sentCreatedProperty.price.amount >= 2000) {
      sentCreatedProperty.priceRange = '2000-3000';
    }
    else {
      sentCreatedProperty.priceRange = '<=2000';
    }
    const fd = new FormData();
    for (const key in sentCreatedProperty) {
      if (Object.prototype.hasOwnProperty.call(sentCreatedProperty, key)) {
        fd.append(key, sentCreatedProperty[key]);
      }
    }

    if (images && images.length !== 0) {

      // const createdProperty = Object.assign({}, sentCreatedProperty);
      // we copy it not to alter the sent object as it affects preview

      fd.append(`image`, images);
    }
    return this.http.post<Property>(createPropertyURL, fd).pipe(
      switchMap((newProp: Property) => {
        sentCreatedProperty.id = newProp.id;
        currentUser.posts.push(newProp.id);
        return this.updateUser(currentUser);
      })
    );
  }

  updateProperty(editedProperty, images?, linksToRemove?: string[]): Subject<any> | Observable<any> {
    const done = new Subject();

    editedProperty.bedrooms > 3 ? editedProperty.fourPlus = true : editedProperty.fourPlus = false;
    if (editedProperty.price.amount >= 5000) {
      editedProperty.priceRange = '>5000';
    }
    else if (editedProperty.price.amount >= 3000) {
      editedProperty.priceRange = '3000-5000';
    }
    else if (editedProperty.price.amount >= 2000) {
      editedProperty.priceRange = '2000-3000';
    }
    else {
      editedProperty.priceRange = '<=2000';
    }

    const fd = new FormData();
    for (const key in editedProperty) {
      if (Object.prototype.hasOwnProperty.call(editedProperty, key)) {
        fd.append(key, editedProperty[key]);
      }
    }
    if (images && images.length !== 0) {

      // const createdProperty = Object.assign({}, sentCreatedProperty);
      // we copy it not to alter the sent object as it affects preview

      fd.append(`image`, images);
    }
    return this.http.put<Property>(editedProperty, fd).pipe(
      // TODO: if(linksToRemove), delete images from server
    );
  }

  getPostsForUser(userid: string): Observable<Property[]> {
    return this.getUser(userid).pipe(
      switchMap((user) => {
        return combineLatest(user.posts.map(post => this.getProperty(post)));
      })
    );
  }

  deleteProperty(property: Property): Observable<void> {

    return this.http.delete<void>(deletePropertyURL).pipe(
      // DELETE the pictures from your storage(property.propertyImages)
    );
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
