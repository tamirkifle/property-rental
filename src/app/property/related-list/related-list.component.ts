import { Component, Input, OnInit } from '@angular/core';
import { Property } from '../property';

@Component({
  selector: 'app-related-list',
  templateUrl: './related-list.component.html',
  styleUrls: ['./related-list.component.css']
})
export class RelatedListComponent implements OnInit {
  @Input() relatedItems: Property[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.relatedItems);
  }

}
