import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    id: 11,
    username: 'edelala',
    contact: 'edelala@gmail.com',
    password: '1234',
    firstname: 'Ethio',
    lastname: 'Delala',
    avatar: 'assets/guy-avatars/guy-4.jpg',
    posts: [11, 14, 15, 16],
    rating: 4.2,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
