import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user';
import { UserService } from '../../user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.users = this.route.parent.snapshot.data.users;
  }

  // getUsers(){
  //   this.userService.getUsers().subscribe(users => this.users = users);
  // }
}
