import { HostBinding, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.css'],
})
export class FilterFieldComponent implements OnInit {
  @HostBinding('class.active') isActive = false;
  @Input() filterField: string;
  @Output() fieldClicked = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  toggleActive(event) {
    this.fieldClicked.emit(event);
  }
}
