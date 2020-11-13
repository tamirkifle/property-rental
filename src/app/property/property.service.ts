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
import { getAllPropertiesURL, getPropertyBaseURL, createPropertyURL, updatePropertyURL, deletePropertyURL } from 'src/app/api';
import { updateUserURL } from '../api';


@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  allFilterOptions = [];
  // private propertiesURL = 'api/properties';
  // private usersURL = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private filterBy: FilterByPipe,
    private search: PropertyFilterPipe
    ) { }

  getProperties(options?: PropertyOptions): Observable<Property[]> {
    if (options && (options.search && options.filterBy)){
        let params = new HttpParams();
        if (options.search){
          params = params.append('s', options.search);
        }
        if (options.filterBy && options.filterBy.length !== 0){
          options.filterBy.forEach(filter => params = params.append('by', filter));
        }
        return this.http.get<Property[]>(getAllPropertiesURL, { params });

    }
    return this.http.get<Property[]>(getAllPropertiesURL)
    .pipe(
      catchError(this.handleError<Property[]>('getProperties', []))
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

  getProperty(id: number): Observable<Property> {
    const url = `${getPropertyBaseURL}/${id}`;
    return this.http.get<Property>(url).pipe(
      catchError(this.handleError<Property>(`getProperty id=${id}`))
    );
  }

  addProperty(createdProperty){
    return this.http
      .post(createPropertyURL, createdProperty).pipe(
        catchError(this.handleError<Property>(`addProperty`))
      );;
  }

  updateProperty(editedProperty){
    console.log('in update property:', editedProperty);
    return this.http
      .put(updatePropertyURL, editedProperty).pipe(
        catchError(this.handleError(`updateProperty`))
      );
  }

  likeProperty(propertyId) {
    if (!this.authService.currentUser.favorites) {
      this.authService.currentUser.favorites = [];
    }
    this.authService.currentUser.favorites.push(propertyId);
    return this.http.put(updateUserURL, this.authService.currentUser).pipe(
      catchError(this.handleError(`likeProperty`))
    );
  }

  unlikeProperty(propertyId){
    this.authService.currentUser.favorites = this.authService.currentUser.favorites.filter(id => id !== propertyId);
    return this.http.put(updateUserURL, this.authService.currentUser).pipe(
      catchError(this.handleError(`unlikeProperty`))
    );
  }

  deleteProperty(property){
    const id = typeof property === 'number' ? property : property.id;
    const url = `${deletePropertyURL}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError(this.handleError(`deleteProperty`))
    );
  }

  getRelatedProperties(id){
      // NOT IMPLEMENTED: get all realted properties to property
      return this.http.get<Property[]>(getAllPropertiesURL)
      .pipe(
        map(properties => properties.filter(p => p.id !== id)),
        map(properties => properties.splice(0, 7)),
        catchError(this.handleError<Property[]>(`getRelatedProperties`, []))
      );
  }
}
