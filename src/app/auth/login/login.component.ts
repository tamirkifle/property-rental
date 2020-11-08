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
  invalidTry = false;
  errorMessage = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(credentials){
    this.errorMessage = null;
    this.authService.login(credentials).subscribe(
      resp => {
        this.authService.userChanged.emit();
        this.authService.redirectUrl ? this.router.navigate([this.authService.redirectUrl]) : this.router.navigate(['/properties']);
    },
    err => {
      this.errorMessage = err.message;
      console.log(String(this.errorMessage));

    });

  }
}
