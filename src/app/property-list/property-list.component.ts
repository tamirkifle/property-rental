import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { properties as MOCKPROPERTIES } from '../mock-properties';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = MOCKPROPERTIES;
  constructor() { }

  ngOnInit(): void {
  }

}
