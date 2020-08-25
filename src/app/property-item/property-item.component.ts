import { Component, OnInit } from '@angular/core';
import { Property } from '../property';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css']
})
export class PropertyItemComponent implements OnInit {
  property: Property = {
    id: 1,
    bedrooms: 3,
    listPrice: 2000,
    priceType: 'Fixed',
    postCreator: 'Ethio Delala',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
