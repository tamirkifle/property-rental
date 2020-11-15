import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm = '';
  avatar = 'assets/other_icons/profile.png';
  userFirstName = 'Profile';
  isLoggedIn = false;
  isAdmin = false;
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

    this.authService.userChanged.subscribe(() => {
      this.avatar = this.authService.currentUser ? this.authService.currentUser.avatar : 'assets/other_icons/profile.png';
      this.userFirstName = this.authService.currentUser ? this.authService.currentUser.firstname : 'Profile';
    });

    this.authService.authState$.subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn;
      this.isAdmin = this.authService.isAdmin;

    })
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

  logout () {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  saveRedirect(){
    this.authService.redirectUrl = this.router.url.split('?')[0];
  }

}
