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
  // id?: number;
  // username: string;
  // firstname: string;
  // lastname: string;
  // displayname?: string;
  // contact: {type: 'phone'|'email', value: string}[]; //phone or email
  // avatar?: string;
  // address?: {city: string, subCity: string, neighborhood: string};
  // company?: string;
  // about?: string;
  // posts: number[];
  // favorites?: number[]; //property ids
  // // password: string;
  // isAdmin?: boolean;
  // rating?:

  createdUser: User = {
    username: null,
    firstname: null,
    lastname: null,
    contact: {phone: null, email: null},
    avatar: null, // 'assets/placeholders/avatar.png'
    address: { city: null, subCity: null, neighborhood: null },
    company: null,
    about: null,
    posts: [],
    favorites: [],
    rating: null,
  };

  userEmail: string;
  userPhone: string;
  userPass: string;
  customError: string;
  invalidTry = false;

  // url = 'api/users';
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  checkContact() {
    if (!this.createdUser.contact.phone && !this.createdUser.contact.email) {
      this.customError = 'Please enter an email or phone';
      return false;
    }
    return true;
  }
  onFormSubmit() {
    if (!this.checkContact()){
      return;
    }
    this.userService.addUser(this.createdUser, this.userPass).subscribe((createdUser: User) => {
      this.authService.login({ user: createdUser.username, password: this.userPass }).subscribe((result) => {
        if (result === true) {
          this.router.navigate(['/properties']);
        }
      });
    });
  }

  log(x){
    console.log(x);
  }
}
