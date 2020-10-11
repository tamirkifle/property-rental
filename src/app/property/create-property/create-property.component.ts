import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user/user';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { Observable, of } from 'rxjs';
import { DialogService } from '../../dialog.service';
import { isEqualWith } from 'lodash-es';
import { AuthService } from 'src/app/auth/auth.service';
import { PropertyService } from '../property.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css'],
})
export class CreatePropertyComponent implements OnInit, CanComponentDeactivate {
  createdProperty: Property = {
    bedrooms: null,
    id: null,
    listPrice: null,
    location: null,
    postCreator: null,
    priceType: 'Negotiable',
    propertyImages: ['assets/placeholders/no_img.png'],
    propertyTitle: null,
    amenities: null,
    areaInM2: null,
    bathrooms: null,
    levels: null,
  };
  url = 'api/properties';
  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onFormSubmit() {
    // post creator should be set to logged in user through a service
    this.createdProperty.postCreator = this.authService.currentUser.username;
    if (this.createdProperty.propertyTitle === null && this.createdProperty.bedrooms && this.createdProperty.location) {
      this.createdProperty.propertyTitle = `${this.createdProperty.bedrooms} House in ${this.createdProperty.location}`;
    }
    this.propertyService.addProperty(this.createdProperty)
      .subscribe((added: Property) => {
        this.authService.currentUser.posts.push(added.id);
        this.userService.updateUser(this.authService.currentUser).subscribe(() => {
          this.createdProperty.id = added.id;
          this.router.navigate(['/properties']);
        });
      });
  }
  canDeactivate(): Observable<boolean> {
    const emptyProperty: Property = {
      bedrooms: null,
      id: null,
      listPrice: null,
      location: null,
      postCreator: null,
      priceType: 'Negotiable',
      propertyImages: ['assets/placeholders/no_img.png'],
      propertyTitle: null,
      amenities: null,
      areaInM2: null,
      bathrooms: null,
      levels: null,
    };
    function customComparison(one, two){
      if (one === '' && two === null || one === null && two === ''){
        return true;
      }
    }
    if(this.createdProperty.id !== null){
      return of(true);
    }
    if (isEqualWith(this.createdProperty, emptyProperty, customComparison)) {
      return of(true);
    }
    return this.dialogService.confirm(
      'All unsaved changes will be lost, do you want to continue?'
    );
  }

  cancelCreation(){
    this.router.navigate(['..'], {relativeTo: this.route} );
  }
}
