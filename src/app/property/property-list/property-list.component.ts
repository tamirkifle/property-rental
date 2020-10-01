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
  filterOptions: string[] = [];
  // selectedProperty: Property;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  searchText = '';
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchText = params.get('search');
      if (params.get('by')) {
        this.filterOptions = params.getAll('by');
      }
      // console.log(this.searchText, this.filterOptions);
      this.getProperties();

    });

  }
  ngOnChanges(){
    console.log(this.route.snapshot.queryParams.options);
  }
  // onSelect(property: Property): void{
  //   this.selectedProperty = property;
  // }

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

  getProperties(): void {
    this.propertyService
      .getProperties()
      .subscribe((properties) => {(this.properties = properties);;
      });
  }

  showPropertyDetail(id){
    this.router.navigate([`/properties/detail/${id}`], {queryParamsHandling: 'preserve'});
  }
}
