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
  relatedItems: Property[];
  showRelated = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    media: MediaObserver
  ) {
    this.media$ = media.asObservable();
  }

  ngOnInit(): void {
    if (this.route.parent.snapshot.url[0].path === 'admin'){
      this.showRelated = false;
    }
    this.media$.subscribe(mq => {
      // console.log(mq[0].mqAlias);
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
      this.relatedItems = this.shuffle(data.relatedItems);
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
    this.authService.currentUser$.subscribe(() => {
      this.isAuthorizedToEdit = this.authService.isLoggedIn && (this.authService.currentUser.username === this.postCreatorUser.username || this.authService.currentUser.isAdmin);
    })
  }

  goBack(): void {
    this.router.navigate(['../..'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

   shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
}
