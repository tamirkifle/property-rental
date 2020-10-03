import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Property } from '../property';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  property: Property;
  postCreatorUser: User;
  editedProperty: Property;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editedProperty = this.property = this.route.snapshot.data.property;
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
    // this.location.back();
    let parent = this.route.snapshot.pathFromRoot[1].url[0].path;
    if (parent === 'admin') {
      parent += '/properties';
    }
    this.router.navigate([parent], {queryParamsHandling: 'preserve'});
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
  onFormSubmit(){
    
  }
}
