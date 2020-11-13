import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: Property[];
  filterOptions: string[] = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}
  searchText: string = null;
  ngOnInit(): void {
    // console.log('ngOnInit');
    this.route.queryParamMap.subscribe((params) => {
      this.searchText = params.get('s');
      this.filterOptions = params.getAll('by');
    });
    this.route.data.subscribe(data => {
      this.properties = data.properties;
      // console.log(data);
    });

  }

  ngAfterViewInit(){
    this.filterOptions = this.filterOptions.filter(query => this.propertyService.allFilterOptions.includes(query));
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

  showPropertyDetail(id){
    this.router.navigate([`/properties/detail/${id}`], {queryParamsHandling: 'preserve'});
  }

  removeFavorite(propId){
    if (this.router.url !== '/properties/favorites'){
      return;
    }
    this.properties = this.properties.filter(p => p.id !== propId);
  }

  removeFilter(filter){
    this.filterOptions = this.filterOptions.filter(fOpt => filter !== fOpt );
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: { by: this.filterOptions },
        queryParamsHandling: 'merge',
    });

  }

  clearFilters(){
    this.filterOptions = [];
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: { by: this.filterOptions },
        queryParamsHandling: 'merge',
    });
  }

  clearSearch(){
    this.searchText = null;
    this.filterOptions = null;
    this.router.navigate([],
      {
        queryParams: { s: this.searchText, by: this.filterOptions },
        queryParamsHandling: 'merge',
    });
  }
}
