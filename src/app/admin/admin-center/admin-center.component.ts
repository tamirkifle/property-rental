import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-center',
  templateUrl: './admin-center.component.html',
  styleUrls: ['./admin-center.component.css']
})
export class AdminCenterComponent implements OnInit {
  avatar: string;
  userFirstName: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.redirectUrl = null;
    this.avatar = this.authService.currentUser ? this.authService.currentUser.avatar : 'assets/other_icons/profile.png';
    this.userFirstName = this.authService.currentUser ? this.authService.currentUser.firstname : 'Admin';
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
