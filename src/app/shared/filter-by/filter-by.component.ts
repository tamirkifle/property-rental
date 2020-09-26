import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by',
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.css']
})
export class FilterByComponent implements OnInit {
  @Input() filterDetails: {name: string, options: string[]};
  @Input() otherOptionsActive: boolean;
  @Output() optionActive = new EventEmitter();
  filterOptions = ['Addis Ababa', 'Mekele', 'Bahir Dar', 'Adama'];
  showOptions = false;
  constructor() { }

  ngOnInit(): void {

  }

  toggleOptions(){

    this.optionActive.emit(this);
    this.showOptions = !this.showOptions;
  }
}
