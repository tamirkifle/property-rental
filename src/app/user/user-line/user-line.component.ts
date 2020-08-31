import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-line',
  templateUrl: './user-line.component.html',
  styleUrls: ['./user-line.component.css'],
})
export class UserLineComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  ngOnInit(): void {}

  showUserDetail() {
    document.querySelector('app-user-detail').classList.remove('hidden');
  }
}
