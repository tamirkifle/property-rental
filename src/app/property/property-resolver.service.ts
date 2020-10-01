import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Property } from './property';
import { PropertyService } from './property.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyResolver implements Resolve<Property> {
  constructor(private propertyService: PropertyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Property> {
    const id = route.paramMap.get('id');
    return this.propertyService.getProperty(+id);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PropertiesResolver implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService) {}

  resolve(
  ): Observable<Property[]> {
    return this.propertyService.getProperties();
  }
}
