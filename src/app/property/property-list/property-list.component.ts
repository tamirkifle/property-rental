import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Property } from '../property';

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
    private router: Router
  ) {}
  searchText: string = null;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchText = params.get('s');
      if (params.get('by')) {
        this.filterOptions = params.getAll('by');
      }
      // console.log(this.searchText, this.filterOptions);
      
    });
    this.route.data.subscribe(data => this.properties = data.properties);

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

    console.log('propID', propId);
    this.properties = this.properties.filter(p => p.id !== propId);
    console.log(this.properties);

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
