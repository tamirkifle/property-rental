import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-property-center',
  templateUrl: './property-center.component.html',
  styleUrls: ['./property-center.component.css'],
})
export class PropertyCenterComponent implements OnInit {
  searchTerm = '';
  avatar = '';
  userFirstName = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.authService.redirectUrl = null;
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('s') || '';
    });

    this.avatar = this.authService.currentUser ? this.authService.currentUser.avatar : 'assets/other_icons/profile.png';
    this.userFirstName = this.authService.currentUser ? this.authService.currentUser.firstname : 'Profile';

    this.userService.profileChanged.subscribe(() => {
      this.avatar = this.authService.currentUser ? this.authService.currentUser.avatar : 'assets/other_icons/profile.png';
      this.userFirstName = this.authService.currentUser ? this.authService.currentUser.firstname : 'Profile';
    });
  }
  onSearch(searchTerm) {
    if (!searchTerm) {
      this.router.navigate([], {
        relativeTo: this.route,
        // queryParamsHandling: 'merge',
        // skipLocationChange: true
      });
      return;
    }
    this.searchTerm = searchTerm;
    this.router.navigate(['/properties'], {
      queryParams: { s: searchTerm },
      // queryParamsHandling: 'merge',
    });
  }

  logout() {
    this.authService.logout();
    this.avatar = 'assets/other_icons/profile.png';
    this.userFirstName = 'Profile';
  }

  goToLoginPage(){
    this.authService.redirectUrl = this.router.url.split('?')[0];
    this.router.navigateByUrl('/login');
  }

}
