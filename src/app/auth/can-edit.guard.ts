import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.redirectUrl = state.url.split('?')[0];
    const id = next.paramMap.get('id');
    return this.authService.currentUser$.pipe(
      map((user: User) => {
        if (user && user.posts.includes(id)) {
          return true;
        }
        if (user.isAdmin) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      }));
  }
}
