import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    setTimeout(() => console.log(this.users), 2000);
  }

  getUsers(){
    this.userService.getUsers().subscribe(users => this.users = users);
  }
}
