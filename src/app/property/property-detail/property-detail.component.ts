import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';

import { PropertyService } from '../property.service';
import { Property } from '../property';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  property: Property;
  postCreatorUser: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private propertyService: PropertyService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.property = this.route.snapshot.data.property;
    this.postCreatorUser = this.route.snapshot.data.user;
  }

  addCommas(num): string {
    const str = String(num);
    const length = str.length;
    return str
      .split('')
      .map((item, i) =>
        (length - 1 - i) % 3 === 0 && i !== length - 1 ? item + ',' : item
      )
      .join('');
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  get isAuthorizedToEdit(){
    console.log(this.authService.isLoggedIn, this.authService.currentUser);
    return this.authService.isLoggedIn && (this.authService.currentUser.username === this.postCreatorUser.username);
  }
}
