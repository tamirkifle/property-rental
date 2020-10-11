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
    priceType: null,
    propertyImages: ['assets/placeholders/no_img.png'],
    propertyTitle: null,
    amenities: null,
    areaInM2: null,
    bathrooms: null,
    levels: null,
  };
  url = 'api/properties';
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onFormSubmit() {
    // post creator should be set to logged in user through a service
    this.createdProperty.postCreator = this.authService.currentUser;
    if (this.createdProperty.propertyTitle === null && this.createdProperty.bedrooms && this.createdProperty.location) {
      this.createdProperty.propertyTitle = `${this.createdProperty.bedrooms} House in ${this.createdProperty.location}`;
    }
    this.http
      .post(this.url, this.createdProperty)
      .subscribe((result) => console.log('Successfully Added'));
    this.router.navigate(['admin/properties']);
  }
  canDeactivate(): Observable<boolean> {
    const emptyProperty: Property = {
      bedrooms: null,
      id: null,
      listPrice: null,
      location: null,
      postCreator: null,
      priceType: null,
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
