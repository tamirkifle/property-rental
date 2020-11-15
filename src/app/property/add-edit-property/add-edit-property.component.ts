import { Component, OnInit, ViewChild } from '@angular/core';
import { Property } from '../property';
import { Router, ActivatedRoute } from '@angular/router';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { Observable, of, Subject } from 'rxjs';
import { DialogService } from '../../dialog.service';
import { isEqualWith } from 'lodash-es';
import { AuthService } from 'src/app/auth/auth.service';
import { PropertyService } from '../property.service';
import { UserService } from '../../user/user.service';
import { StorageService } from '../../storage.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

@Component({
  templateUrl: './add-edit-property.component.html',
  styleUrls: ['./add-edit-property.component.css'],
})
export class AddEditPropertyComponent implements OnInit, CanComponentDeactivate {
  currentProperty: Property = {
    bedrooms: null,
    id: null,
    price: { amount: null, type: 'Negotiable' },
    address: { city: null, neighborhood: null },
    postCreator: null,
    propertyImages: [],
    propertyTitle: null,
    amenities: [],
    areaInM2: null,
    bathrooms: null,
    levels: null,
    houseType: null
  };
  editing = false;
  imagePreviews: string[] = [];
  images: File[] = [];
  invalidTry = false;
  removeFromStorage = [];
  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private fstorage: StorageService
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.data.property){
      this.currentProperty = this.route.snapshot.data.property;
      this.editing = true;
    }

  }

  onEdit() {
    const fd = new FormData();
    fd.append('property', JSON.stringify(this.currentProperty));
    this.images?.forEach((image, i) => {
      fd.append(`image${i + 1}`, image);
    });


    // fd.forEach((value, key) => {
      // console.log(key, ': ', value);
    // });

    // this.imagePreviews.forEach(img => this.currentProperty.propertyImages.push(img)); // just to preview images
    // this.imagePreviews = []; // so no double previews show
    this.propertyService.updateProperty(this.currentProperty, this.images, this.removeFromStorage).subscribe(
      (done: Subject<any>) => {
        this.router.navigate(['..'], { relativeTo: this.route });
        done.unsubscribe();
      }
    );
    // this.propertyService.addProperty(this.currentProperty)
    //   .subscribe((doc) => {
    //     this.authService.currentUser.posts.push(doc.id);
    //     this.userService.updateUser(this.authService.currentUser).subscribe(() => {
    //       this.currentProperty.id = doc.id;
    //       this.router.navigate(['/properties']);
    //       console.log('created property: ', this.currentProperty);
    //     });
    //   });
  }
  onCreate() {

    const fd = new FormData();
    fd.append('property', JSON.stringify(this.currentProperty));
    this.images?.forEach((image, i) => {
      fd.append(`image${i + 1}`, image);
    });

    fd.forEach((value, key) => {
      console.log(key, ': ', value);
    });


    // post creator should be set to logged in user through a service
    // just to preview images
    // this.imagePreviews.forEach(img => this.currentProperty.propertyImages.push(img)); 
    // so no double previews show
    // this.imagePreviews = []; 

    // this.currentProperty.postCreator = this.authService.currentUser.id;
    // if (
    //   this.currentProperty.propertyTitle === null
    //   && this.currentProperty.bedrooms
    //   && this.currentProperty.address.city
    // ) {
      // console.log(this.currentProperty.address.neighborhood);
      // this.currentProperty.propertyTitle = `${this.currentProperty.bedrooms} Bedroom  House in ${this.currentProperty.address.neighborhood ? this.currentProperty.address.neighborhood + ',' : ''} ${this.currentProperty.address.city}`;
    // }
    this.propertyService.addProperty(this.currentProperty, this.images).subscribe(
      (done: Subject<any>) => {
        if (this.currentProperty.id){
          this.router.navigate([`/properties/detail/${this.currentProperty.id}`], { relativeTo: this.route });
        }
        else{
          this.router.navigate([`/properties/myposts`], { relativeTo: this.route });
        }
        done.unsubscribe();
      }
    );
  }
  canDeactivate(): Observable<boolean> {
    const emptyProperty: Property = {
      bedrooms: null,
      id: null,
      price: { amount: null, type: 'Negotiable' },
      address: { city: null, neighborhood: null },
      postCreator: null,
      propertyImages: [],
      propertyTitle: null,
      amenities: [],
      areaInM2: null,
      bathrooms: null,
      levels: null,
      houseType: null,
    };
    function customComparison(one, two) {
      if (one === '' && two === null || one === null && two === '') {
        return true;
      }
    }
    if (this.currentProperty.id !== null) {
      return of(true);
    }
    if (isEqualWith(this.currentProperty, emptyProperty, customComparison)) {
      return of(true);
    }
    return this.dialogService.confirm(
      'All unsaved changes will be lost, do you want to continue?'
    );
  }

  cancelCreation() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  addToImages(files: FileList) {
    const newFiles = [];
    // console.log('filelist: ', files);
    for (const imgFile of Array.from(files))  {
      if (!this.images.includes(imgFile)){
        newFiles.push(imgFile);
        this.images.push(imgFile);
      }
    }
    // console.log('this.images', this.images);
    this.addToPreviews(newFiles);
  }

  addToPreviews(files: File[]){
    for (const imgFile of files){
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.addEventListener('load', () => {
      this.imagePreviews.push(String(reader.result));
      });
    }
  }

  updateAmenities(amenities) {
    this.currentProperty.amenities = amenities.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  log(event) {
    console.log(event);
  }

  addAmenity(amenities) {
    amenities = amenities.split(',').map(item => item.trim()).filter(item => item !== '');//add multiple separated with commas
    for (const amenity of amenities){
      if (amenity && !this.currentProperty.amenities.includes(amenity)) {
        this.currentProperty.amenities.push(amenity);
      }
    }
  }

  removeAmenity(amenity) {
    this.currentProperty.amenities = this.currentProperty.amenities.filter(item => item !== amenity);
  }

  removeImage(preview) {
    // console.log('preview to remove:', preview);
    this.imagePreviews = this.imagePreviews.filter((pr, i) => {
      if (pr === preview){
        this.images = this.images.filter((image, j) => j !== i);
        return false;
      }
      return true;
    });
    // console.log('this.images:', this.images);
    // console.log('this.previews:', this.imagePreviews);
  }

  removeCurrentImage(imageLink){
    this.currentProperty.propertyImages = this.currentProperty.propertyImages.filter(link => link !== imageLink);
    this.removeFromStorage.push(imageLink);
  }
  makeInvalid(submitBtn){
    if (submitBtn.disabled){
      this.invalidTry = true;
    }
  }

  deleteProperty(property){
    if (!this.authService.isLoggedIn){//SAFETY MEASURE
      this.router.navigateByUrl('/login');
      return;
    }
    if (!this.authService.currentUser?.posts.includes(this.currentProperty.id) && !this.authService.currentUser.isAdmin){//SAFETY MEASURE
      this.router.navigateByUrl('/login');
      return;
    }
    this.dialogService.confirm('Property will be forever deleted, are you sure?').subscribe((yesDelete) => {
      if (yesDelete){
        this.propertyService.deleteProperty(property).subscribe(() => {
          this.authService.currentUser.posts = this.authService.currentUser.posts.filter(id => id !== property.id);
          this.userService.updateUser(this.authService.currentUser).subscribe(() => {
            this.router.navigateByUrl('/properties/myposts');
          });
        });
      }
    });
  }
}
