import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(credentials){
    this.authService.adminLogin(credentials).subscribe(
      resp => {
      if (resp === true) {
        this.authService.redirectUrl ? this.router.navigate([this.authService.redirectUrl]) : this.router.navigate(['/admin']);
      }
    });
  }
}
