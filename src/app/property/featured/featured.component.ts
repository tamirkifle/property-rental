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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchText = params.get('s');
      if (params.get('by')) {
        this.filterOptions = params.getAll('by');
      }
    });
    this.properties = this.route.snapshot.data.favorites;
  }
}
