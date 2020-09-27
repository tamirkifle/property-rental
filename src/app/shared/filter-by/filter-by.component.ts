import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by',
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.css']
})
export class FilterByComponent implements OnInit {
  @Input() filterDetails: {name: string, options: string[]};
  @Input() otherOptionsActive: boolean;
  @Output() fieldActive = new EventEmitter();
  filterOptions = ['Addis Ababa', 'Mekele', 'Bahir Dar', 'Adama'];
  showOptions = false;
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

  }

  toggleOptions(){
    this.fieldActive.emit(this);
    this.showOptions = !this.showOptions;
  }

  onOptionSelected(option){
    this.optionSelected.emit(option);
  }
}
