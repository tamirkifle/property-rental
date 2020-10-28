import { Component, OnInit, ViewChild } from '@angular/core';
import { Property } from '../property';
import { Router, ActivatedRoute } from '@angular/router';
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
    price: {amount: null, type: 'Negotiable'},
    address: {city: null, area: null},
    postCreator: null,
    propertyImages: ['assets/placeholders/no_img.png'],
    propertyTitle: null,
    amenities: null,
    areaInM2: null,
    bathrooms: null,
    levels: null,
  };
  images: File[];
  invalidTry = false;
  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void { }

  onFormSubmit() {

    const fd = new FormData();
    fd.append('property', JSON.stringify(this.createdProperty));
    this.images?.forEach((image, i) => {
      fd.append(`image${i + 1}`, image);
    });

    fd.forEach((value, key) => {
      console.log(key, ': ', value);
    });


    // post creator should be set to logged in user through a service
    this.createdProperty.postCreator = this.authService.currentUser.username;
    if (
      this.createdProperty.propertyTitle === null
      && this.createdProperty.bedrooms
      && this.createdProperty.address.area
      && this.createdProperty.address.city
      ) {
      this.createdProperty.propertyTitle = `${this.createdProperty.bedrooms} House in ${this.createdProperty.address.area}, ${this.createdProperty.address.city}`;
    }
    this.propertyService.addProperty(this.createdProperty)
      .subscribe((added: Property) => {
        this.authService.currentUser.posts.push(added.id);
        this.userService.updateUser(this.authService.currentUser).subscribe(() => {
          this.createdProperty.id = added.id;
          this.router.navigate(['/properties']);
          console.log('created property: ', this.createdProperty);
        });
      });
  }
  canDeactivate(): Observable<boolean> {
    const emptyProperty: Property = {
      bedrooms: null,
      id: null,
      price: { amount: null, type: 'Negotiable' },
      address: { city: null, area: null },
      postCreator: null,
      propertyImages: ['assets/placeholders/no_img.png'],
      propertyTitle: null,
      amenities: null,
      areaInM2: null,
      bathrooms: null,
      levels: null,
    };
    function customComparison(one, two) {
      if (one === '' && two === null || one === null && two === '') {
        return true;
      }
    }
    if (this.createdProperty.id !== null) {
      return of(true);
    }
    if (isEqualWith(this.createdProperty, emptyProperty, customComparison)) {
      return of(true);
    }
    return this.dialogService.confirm(
      'All unsaved changes will be lost, do you want to continue?'
    );
  }

  cancelCreation() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  updateImages(files: FileList) {
    this.images = Array.from(files);
  }

  updateAmenities(amenities) {
    this.createdProperty.amenities = amenities.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  log(event) {
    console.log(event);
  }
}
