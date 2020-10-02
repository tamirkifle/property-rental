import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  currentUser = {
    username: null,
    password: null,
  };
  ngOnInit(): void {}

  onLogin() {
    this.authService.login(
      this.currentUser.username,
      this.currentUser.password
    );
    if (this.authService.isLoggedIn) {
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl]);
      } else {
        this.router.navigate(['/properties']);
      }
    }
    else{}
  }
  onButtonClick(form){
    console.log(form);
  }
}
