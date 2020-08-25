import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from '../property.service';
import { Property } from '../property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  property: Property;
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private location: Location) { }

  ngOnInit(): void {
    this.getProperty();

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

  getProperty(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
      .subscribe(property => this.property = property);
  }

  goBack(): void{
    this.location.back();
  }
}
