import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }


  closeDetail(): void{
    // Shouldn't use app-user-detail outside a component that uses it ???????
    document.querySelector('app-user-detail').classList.add('hidden');
  }
}
