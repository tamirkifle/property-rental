import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/property/property';
import { PropertyService } from 'src/app/property/property.service';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {
  properties: Property[];
  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties()
    .subscribe(properties => this.properties = properties);
  }
}
