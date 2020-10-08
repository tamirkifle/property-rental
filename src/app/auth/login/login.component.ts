import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uname: string;
  password: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(credentials){
    this.authService.login(credentials);
    this.authService.redirectUrl ? this.router.navigate([this.authService.redirectUrl]) : this.router.navigate(['/properties']);

  }
}
