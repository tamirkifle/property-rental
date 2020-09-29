import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-center',
  templateUrl: './property-center.component.html',
  styleUrls: ['./property-center.component.css'],
})
export class PropertyCenterComponent implements OnInit {
  searchTerm = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search') || '';
    });
  }
  onSearch(searchTerm) {
    if (!searchTerm) {
      this.router.navigate([], {
        relativeTo: this.route,
        // queryParamsHandling: 'merge',
        // skipLocationChange: true
      });
      return;
    }
    this.searchTerm = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
  }
}
