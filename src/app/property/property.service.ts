import { Injectable } from '@angular/core';
import { Property } from './property';
// import { MOCKPROPERTIES } from './mock-properties';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private propertiesURL = 'api/properties';  // URL to web api

  constructor(private http: HttpClient) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.propertiesURL)
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
    const url = `${this.propertiesURL}/${id}`;
    return this.http.get<Property>(url).pipe(
      catchError(this.handleError<Property>(`getProperty id=${id}`))
    );
  }
}
