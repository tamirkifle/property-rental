import { ActivatedRoute } from '@angular/router';
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
  showOptions = false;
  optionsObjs: {option: string, checked: boolean}[] = [];
  activeOptions: string[];
  @Output() optionSelected: EventEmitter<{option: string, checked: boolean}> = new EventEmitter<{option: string, checked: boolean}>();
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.activeOptions = params.getAll('by');
  });
  }

  toggleOptions(){
    this.fieldToggle.emit(this);
    this.showOptions = !this.showOptions;
  }

  onOptionSelected(inputElement){
    this.optionSelected.emit({option: inputElement.id, checked: inputElement.checked});
  }
}
