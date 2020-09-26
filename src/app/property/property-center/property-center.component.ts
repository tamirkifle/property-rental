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
    this.route.paramMap.subscribe(params => {
      this.searchTerm = params.get('search') || '';
    });
  }
  onSearch(searchTerm) {
    if (!searchTerm) {
      this.router.navigate(['/properties']);
      return;
    }
    this.searchTerm = searchTerm;
    this.router.navigate(['/properties', { search: searchTerm }]);
  }
}
