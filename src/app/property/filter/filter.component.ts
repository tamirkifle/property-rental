import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  filterItems = ['City', 'Sub-City', 'Type', 'Number Of Bed', 'Price Range'];
  constructor() {}

  ngOnInit(): void {}
  activateOnly(event: any): void {
    const clickedField: HTMLElement = event.currentTarget;
    const activeFields = clickedField.parentElement.parentElement.querySelectorAll(
      '.active'
    );
    if (activeFields.length === 0) {
      clickedField.classList.add('active');
      return;
    } else {
      if (clickedField.classList.contains('active')) {
        clickedField.classList.remove('active');
        return;
      } else {
        activeFields.forEach((field) => field.classList.remove('active'));
        clickedField.classList.add('active');
      }
    }
  }
}
