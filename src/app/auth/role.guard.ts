import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn){
      return true;
    }
    return this.authService.authState$.pipe(
      map((result) => {
        if (result){
          return true;
        }
        else{
          this.authService.redirectUrl = state.url.split('?')[0];
          this.router.navigate(['/login']);
          return false;
        }
        

        
      })
    );
    
    
  }
}
