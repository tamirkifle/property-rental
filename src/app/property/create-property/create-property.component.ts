import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../user/user';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css'],
})
export class CreatePropertyComponent implements OnInit {
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
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit(){
    // post creator should be set to logged in user through a service
    this.createdProperty.postCreator = 'allhouseset';
    if(this.createdProperty.propertyTitle == null){
      this.createdProperty.propertyTitle = `${this.createdProperty.bedrooms} House in ${this.createdProperty.location}`; 
    }
    this.http
      .post(this.url, this.createdProperty)
      .subscribe((result) => console.log('Successfully Added'));
    this.router.navigate(['admin/properties']);
  }
}
