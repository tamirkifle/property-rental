import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { flatten } from 'lodash-es';
import { PropertyService } from '../../property/property.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  filterItems = [
    {
      name: 'City',
      options: ['Addis Ababa', 'Mekele', 'Bahir Dar', 'Adama'],
    },
    {
      name: 'Sub-City',
      options: ['Kirkos', 'Bole', 'Lideta', 'Yeka'],
    },
    {
      name: 'Type',
      options: ['Apartment', 'Full Compound', 'Room(s)'],
    },
    {
      name: 'Number Of Bedrooms',
      options: ['One Bedroom', 'Two Bedrooms', 'Three Bedrooms', '>3 Bedrooms'],
    },
    {
      name: 'Price Range',
      options: ['<2000', '2000-3000', '3000-5000', '>5000'],
    },
  ];
  activeOptions: string[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.propertyService.allFilterOptions = flatten(this.filterItems.map(filter => filter.options));
    this.route.queryParamMap.subscribe(params => {
      this.activeOptions = [];
      params.getAll('by').forEach(option => {
        {
          if (this.propertyService.allFilterOptions.includes(option)) {
            this.activeOptions.push(option);
          }
          console.log(this.activeOptions);
        }
      });
    });
  }

  updateActiveOptions(optionName, checked) {
    if (checked) {
      if (!this.activeOptions.includes(optionName)) {
        this.activeOptions.push(optionName);
      }
    } else {
      this.activeOptions = this.activeOptions.filter(
        (option) => !(option === optionName)
      );
    }
  }

  filterBySelected() {
    this.router.navigate([], {
      queryParams: { by: this.activeOptions },
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
  }

  removeFilter(filter) {
    this.activeOptions = this.activeOptions.filter(fOpt => filter !== fOpt);
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: { by: this.activeOptions },
        queryParamsHandling: 'merge',
      });

  }

  clearFilters() {
    this.activeOptions = [];
    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: { by: this.activeOptions },
        queryParamsHandling: 'merge',
      });
  }
}
