import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = {
    id: 14,
    username: 'allhouseset',
    firstname: 'AllHouse',
    lastname: 'Ethiopia',
    avatar: '../../assets/guy-avatars/guy-2.jpg',
    posts: 5,
    rating: 5,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
