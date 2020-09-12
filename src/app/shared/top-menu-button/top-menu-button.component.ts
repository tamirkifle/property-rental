import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu-button',
  templateUrl: './top-menu-button.component.html',
  styleUrls: ['./top-menu-button.component.css']
})
export class TopMenuButtonComponent implements OnInit {
  @Input() name: string;
  @Input() iconSrc = '';
  constructor() { }

  ngOnInit(): void {
    
  }

}
