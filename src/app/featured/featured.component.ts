import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
  properties: Property[];
  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getProperties();
  }
  getProperties(): void {
    this.propertyService.getProperties()
      .subscribe(properties => this.properties = properties.slice(0, 2));
  }
}
