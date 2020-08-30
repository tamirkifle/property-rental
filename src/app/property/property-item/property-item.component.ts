import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Observable, of, Subscription } from 'rxjs';


@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css'],
})
export class PropertyItemComponent implements OnInit {
  @Input() property: Property;
  postCreatorUser: User;

  constructor(private userService: UserService) {}

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

  getUser(username: string){
    this.userService.getUsers()
    .subscribe(users => this.postCreatorUser = users.find(user => user.username === username));
  }
}
