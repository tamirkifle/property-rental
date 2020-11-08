import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { Property, PropertyOptions } from './property';
import { PropertyService } from './property.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user';
import { map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyResolver implements Resolve<Property> {
  constructor(private propertyService: PropertyService, private userService: UserService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Property> {
    const id = route.paramMap.get('id');
    return this.propertyService.getProperty(id);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PropertyUserResolver implements Resolve<User> {
  constructor(private propertyService: PropertyService, private userService: UserService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    const id = route.paramMap.get('id');
    return this.propertyService.getProperty(id).pipe(
      switchMap(property => this.userService.getUser(property.postCreator))
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesResolver implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService, private authService: AuthService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Property[]> {
    const favoriteIds = this.authService.currentUser.favorites;
    if (favoriteIds && favoriteIds.length !== 0) {
      return combineLatest(favoriteIds.map(favID => this.propertyService.getProperty(favID)));
    }
    else {
      return of([]);
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserPostsResolver implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService, private authService: AuthService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Property[]> {
    const userPostsIds = this.authService.currentUser.posts;
    if (userPostsIds && userPostsIds.length !== 0) {
      combineLatest(userPostsIds.map(postID => this.propertyService.getProperty(postID))).subscribe(r => console.log(r));
      return combineLatest(userPostsIds.map(postID => this.propertyService.getProperty(postID)));
    }
    else {
      return of([]);
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class PropertiesResolver implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Property[]> {
    const options: PropertyOptions = {
      search: route.queryParams.s,
      filterBy: route.queryParamMap.getAll('by').filter(query => this.propertyService.allFilterOptions.includes(query))};
    console.log('in resolver: ', JSON.stringify(options));
    return this.propertyService.getProperties();
  }
}

@Injectable({
  providedIn: 'root',
})
export class RelatedListResolver implements Resolve<Property[]> {
  constructor(private propertyService: PropertyService, private userService: UserService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Property[]> {
    const id = route.paramMap.get('id');
    return this.propertyService.getRelatedProperties(+id);
  }
}