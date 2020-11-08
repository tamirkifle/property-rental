import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';

import { PropertyService } from '../property.service';
import { Property } from '../property';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  property: Property;
  postCreatorUser: User;
  isAuthorizedToEdit = false;
  imageObject: Array<object>;
  media$: Observable<MediaChange[]>;
  customImageSize = { width: '100%', height: '500px', space: 0 };
  currentBreakPoint: string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private propertyService: PropertyService,
    private router: Router,
    private authService: AuthService,
    media: MediaObserver
  ) {
    this.media$ = media.asObservable();
  }

  ngOnInit(): void {
    this.media$.subscribe(mq => {
      console.log(mq[0].mqAlias);
      this.currentBreakPoint = mq[0].mqAlias;
      if (this.currentBreakPoint === 'xs') {
        this.customImageSize = { width: '100%', height: '300px', space: 0 };
      }
      else if (this.currentBreakPoint === 'md') {
        this.customImageSize = { width: '100%', height: '400px', space: 0 };
      }
      else {
        this.customImageSize = { width: '100%', height: '500px', space: 0 };
      }
    });
    this.route.data.subscribe(data => {
      this.property = data.property;
      this.postCreatorUser = data.user;
      this.isAuthorizedToEdit = this.authService.isLoggedIn && (this.authService.currentUser.username === this.postCreatorUser.username);
      this.imageObject = [];
      this.imageObject = this.property.propertyImages.map(imageLink => {
        return { image: imageLink, thumbImage: imageLink, title: this.property.propertyTitle };
      });
      if (this.imageObject?.length === 0) {
        this.imageObject.push(
          { image: 'assets/placeholders/no_img.png', thumbImage: 'assets/placeholders/no_img.png', title: this.property.propertyTitle }
        );
      }
    });
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}
