import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PropertyService } from '../property.service';
import { Property } from '../property';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.property = this.route.snapshot.data.property;
    this.getUser(this.property.postCreator);
    console.log(this.property);
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

  getUser(username: string) {
    this.userService
      .getUsers()
      .subscribe(
        (users) =>
          (this.postCreatorUser = users.find(
            (user) => user.username === username
          ))
      );
  }
}
