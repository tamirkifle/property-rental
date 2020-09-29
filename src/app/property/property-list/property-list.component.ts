import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}
  searchText = '';
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchText = params.get('search');
      if (params.get('options')) {
        this.filterOptions = params.getAll('options');
      }
      // console.log(this.searchText, this.filterOptions);
      this.getProperties();
    });
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
}
