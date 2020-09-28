import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FilterByComponent } from '../filter-by/filter-by.component';
import { Router } from '@angular/router';

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
  activeComp: FilterByComponent = null;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  // activateOnly(event: any): void {
  //   const clickedField: HTMLElement = event.currentTarget;
  //   const activeFields = clickedField.parentElement.parentElement.querySelectorAll(
  //     '.active'
  //   );
  //   if (activeFields.length === 0) {
  //     clickedField.classList.add('active');
  //     return;
  //   } else {
  //     if (clickedField.classList.contains('active')) {
  //       clickedField.classList.remove('active');
  //       return;
  //     } else {
  //       activeFields.forEach((field) => field.classList.remove('active'));
  //       clickedField.classList.add('active');
  //     }
  //   }
  // }
  resetActiveOption(filterByComponent) {
    if (this.activeComp && this.activeComp !== filterByComponent) {
      this.activeComp.showOptions = false;
    }
    this.activeComp = filterByComponent;
  }
  addToActiveOptions(optionObj) {
    if (optionObj.checked) {
      this.activeOptions.push(optionObj.option);
    } else {
      this.activeOptions = this.activeOptions.filter(
        (option) => !(option === optionObj.option)
      );
    }
  }
  filterBySelected() {
    this.router.navigate(['/properties', { options: this.activeOptions }]);
  }

  closeFilterOptions(){
    this.activeComp.showOptions = false;
  }
}
