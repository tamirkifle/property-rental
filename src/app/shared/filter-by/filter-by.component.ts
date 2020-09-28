import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by',
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.css']
})
export class FilterByComponent implements OnInit {
  @Input() filterDetails: {name: string, options: string[]};
  @Input() otherOptionsActive: boolean;
  @Output() fieldToggle = new EventEmitter();
  filterOptions = ['Addis Ababa', 'Mekele', 'Bahir Dar', 'Adama'];
  showOptions = false;
  @Output() optionSelected: EventEmitter<{option: string, checked: boolean}> = new EventEmitter<{option: string, checked: boolean}>();
  constructor() { }

  ngOnInit(): void {

  }

  toggleOptions(){
    this.fieldToggle.emit(this);
    this.showOptions = !this.showOptions;
  }

  onOptionSelected(inputElement){
    this.optionSelected.emit({option: inputElement.id, checked: inputElement.checked});
    
  }
}
