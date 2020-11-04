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
    price: { amount: null, type: 'Negotiable' },
    address: { city: null, area: null },
    postCreator: null,
    propertyImages: ['assets/placeholders/no_img.png'],
    propertyTitle: null,
    amenities: [],
    areaInM2: null,
    bathrooms: null,
    levels: null,
  };
  imagePreviews: string[] = [];
  images: File[] = [];
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
    this.images.length !== 0 ? this.createdProperty.propertyImages = this.imagePreviews : '';//just to preview images

    this.createdProperty.postCreator = this.authService.currentUser.username;
    if (
      this.createdProperty.propertyTitle === null
      && this.createdProperty.bedrooms
      && this.createdProperty.address.city
    ) {
      console.log(this.createdProperty.address.area);
      this.createdProperty.propertyTitle = `${this.createdProperty.bedrooms} Bedroom  House in ${this.createdProperty.address.area ? this.createdProperty.address.area + ',' : ''} ${this.createdProperty.address.city}`;
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
      amenities: [],
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
    for (const imgFile of Array.from(files))  {
      if (!this.images.includes(imgFile)){
        this.images.push(imgFile);
      }
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.addEventListener('load', () => {
        if (!this.imagePreviews.includes(String(reader.result))) {
          this.imagePreviews.push(String(reader.result));
        }
      });
    }
  }

  updateAmenities(amenities) {
    this.createdProperty.amenities = amenities.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  log(event) {
    console.log(event);
  }

  addAmenity(amenities) {
    amenities = amenities.split(',').map(item => item.trim()).filter(item => item !== '');//add multiple separated with commas
    for (const amenity of amenities){
      if (amenity && !this.createdProperty.amenities.includes(amenity)) {
        this.createdProperty.amenities.push(amenity);
      }
    }
  }

  removeAmenity(amenity) {
    this.createdProperty.amenities = this.createdProperty.amenities.filter(item => item !== amenity);
  }

  removeImage(image, pInput) {
    this.images = this.images.filter(img => img !== image);
    console.log(pInput.files);
  }
  makeInvalid(submitBtn){
    if (submitBtn.disabled){
      this.invalidTry = true;
    }
  }
}
