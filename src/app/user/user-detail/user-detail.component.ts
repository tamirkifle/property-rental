import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Output() closeMe: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
  }


  closeDetail(): void{
    this.closeMe.emit(true);
    // Shouldn't use app-user-detail outside a component that uses it ???????
    // document.querySelector('app-user-detail').classList.add('hidden');
  }
}
