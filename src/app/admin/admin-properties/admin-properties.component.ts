import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/property/property';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {
  properties: Property[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.properties = this.route.parent.snapshot.data.properties;
  }

  // getProperties(): void {
  //   this.propertyService.getProperties()
  //   .subscribe(properties => this.properties = properties);
  // }
}
