import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

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
    posts: [],
  };

  url = 'api/users';
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit(user: User) {
    this.userService.addUser(user).subscribe((createdUser: User) => {
      this.authService.login({user: createdUser.username, password: createdUser.password}).subscribe((result) => {
        if (result === true){
          this.router.navigate(['/properties']);
        }
      });
  });
  }
}
