import { Component, OnInit, Input } from '@angular/core';
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
  postCreatorUser: User;
  favorited: boolean = false;

  constructor(private userService: UserService,
              private propertyService: PropertyService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUser(this.property.postCreator);
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

  getUser(username: string) {
    this.userService.getUsers()
      .subscribe(users => {
        this.postCreatorUser = users.find(user => user.username === username);
        if (this.postCreatorUser.favorites) {
          this.postCreatorUser.favorites.forEach(fav => {
            if (this.property.id === fav) {
              this.favorited = true;
            }
          });
        }
      }
      );
  }

  toggleFavorite(favBtn: HTMLElement) {

    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (favBtn.classList.contains('fa-heart-o')) {//isn't favorited
      this.propertyService.likeProperty(this.property.id).subscribe(() => {
        favBtn.classList.remove('fa-heart-o');
      });
    }
    else{ //is favorited
      this.propertyService.unlikeProperty(this.property.id).subscribe(() => {
        favBtn.classList.add('fa-heart-o');
      });
    }
  }
}
