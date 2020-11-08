import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../property';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { PropertyService } from '../property.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css'],
})
export class PropertyItemComponent implements OnInit {
  @Input() property: Property;
  @Output() removedFavorite: EventEmitter<any> = new EventEmitter();
  postCreatorUser: User;
  favorited: boolean = false;
  constructor(private userService: UserService,
              private propertyService: PropertyService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUser(this.property.postCreator);
    if (this.authService.isLoggedIn && this.authService.currentUser.favorites) {
      if (this.authService.currentUser.favorites.includes(this.property.id)){
        this.favorited = true;
      }
    }
  }

  getUser(userid: string) {
    this.userService.getUser(userid)
      .subscribe(user => {
        this.postCreatorUser = user;
      });
  }

  toggleFavorite(favBtn: HTMLElement) {

    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.authService.currentUser?.favorites?.includes(this.property.id)) {//isn't favorited
      this.propertyService.likeProperty(this.property.id).subscribe(() => {
        this.favorited = true;
      });
    }
    else{ //is favorited
      this.propertyService.unlikeProperty(this.property.id).subscribe(() => {
        this.favorited = false;
        this.removedFavorite.emit(this.property.id);
      });
    }
  }

  formatCurrency(number){
    return (new Intl.NumberFormat('et', { style: 'currency', currency: 'ETB' }).format(number));
  }
}
