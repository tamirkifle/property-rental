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
  filterItems;
  filterKeys = [];
  activeOptions: string[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.filterItems = this.propertyService.filterItems;
    for (const key in this.filterItems){
      if (this.filterItems.hasOwnProperty(key)){
        this.filterKeys.push(key);
      }
    }
    this.route.queryParamMap.subscribe(params => {
      this.activeOptions = [];
      params.getAll('by').forEach(option => {
        {
          if (this.propertyService.allFilterOptions.includes(option)) {
            this.activeOptions.push(option);
          }
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
      queryParams: {s: null, by: this.activeOptions },
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
