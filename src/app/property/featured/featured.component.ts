import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
  properties: Property[];
  searchText = '';
  filterOptions: string[] = [];

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchText = params.get('search');
      if (params.get('options')) {
        this.filterOptions = params.get('options').split(',');
      }
    });
    this.getProperties();
  }
  getProperties(): void {
    this.propertyService.getProperties()
      .subscribe(properties => this.properties = properties.slice(0, 2));
  }
}
