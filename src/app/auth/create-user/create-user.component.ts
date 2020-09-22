import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  createdUser: User = {
    contact: null,
    password: null,
    firstname: null,
    lastname: null,
    username: null,
    avatar: 'assets/placeholders/avatar.png',
    // id: null, //is id a required field for a user or should it bot because it should be automaitically added at the backend
    posts: 0,
  };

  url = 'api/users';
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit(user: User) {
    console.log(user);
    this.http
      .post(this.url, user)
      .subscribe((result) => console.log('Successfully Added'));
    this.router.navigate(['admin/users']);
  }
}
