import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  warningMessage: string = null;
  uname: string;
  password: string;
  invalidTry = false;
  errorMessage = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.redirected.subscribe(redirectUrl => {
      if (redirectUrl === '/properties/favorites') {
        this.warningMessage = 'You need to log in before accessing your favorites';
      }
      else if (redirectUrl === '/properties/create') {
        this.warningMessage = 'You need to log in before you can add a new property';
      }
    });
  }

  onSubmit(credentials) {
    this.errorMessage = null;
    this.authService.login(credentials).subscribe(
      () => {
        this.authService.redirectUrl ? this.router.navigate([this.authService.redirectUrl]) : this.router.navigate(['/properties']);
      },
      err => {
        this.errorMessage = err.message;
      });
  }
}
