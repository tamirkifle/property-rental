import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { HttpClient } from '@angular/common/http';
import { CanComponentDeactivate } from 'src/app/can-deactivate.guard';
import { Observable, of } from 'rxjs';
import { DialogService } from '../../dialog.service';
import { clone, isEqual } from 'lodash-es';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css'],
})
export class EditPropertyComponent implements OnInit, CanComponentDeactivate {
  property: Property;
  postCreatorUser: User;
  editedProperty: Property;
  amenitiesString: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private propertyService: PropertyService,
    private router: Router,
    private http: HttpClient,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.property = this.route.snapshot.data.property;
    this.editedProperty = clone(this.property);
    if (this.editedProperty.amenities) {
      this.amenitiesString = this.editedProperty.amenities.join(', ');
    }
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
    this.router.navigate(['..'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
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

  goToDetail() {
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }

  save() {
    if (this.amenitiesString) {
      this.editedProperty.amenities = this.amenitiesString
        .split(',')
        .map((a) => a.trim());
    }
    this.propertyService.updateProperty(this.editedProperty).subscribe(() => {
      this.property = this.editedProperty;
      this.router.navigate(['..'], {
        relativeTo: this.route,
      });
    }
    );

  }

  canDeactivate(): Observable<boolean> {
    if (isEqual(this.property, this.editedProperty)) {
      return of(true);
    }
    return this.dialogService.confirm(
      'All unsaved changes will be lost, do you want to continue?'
    );
  }
}
