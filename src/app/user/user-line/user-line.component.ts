import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-line',
  templateUrl: './user-line.component.html',
  styleUrls: ['./user-line.component.css']
})
export class UserLineComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
