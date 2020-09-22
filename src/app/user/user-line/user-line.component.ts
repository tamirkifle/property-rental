import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-line',
  templateUrl: './user-line.component.html',
  styleUrls: ['./user-line.component.css'],
})
export class UserLineComponent implements OnInit {
  @Input() user: User;
  active = false;
  constructor() {}

  ngOnInit(): void {}

  showUserDetail() {
    this.active = true;
  }
  closeUserDetail(){
    this.active = false;
  }
}
