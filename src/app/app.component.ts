import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';

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
  checkedAuth = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.authService.redirectUrl = null;
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('s') || '';
    });

    this.authService.userChanged.subscribe(() => {
      this.checkedAuth = true;
      this.isLoggedIn = this.authService.isLoggedIn;
      this.isAdmin = this.authService.isAdmin;

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
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  saveRedirect() {
    const lastURL = this.router.url.split('?')[0];
    if (['/create', '/login'].includes(lastURL)) {
      return;
    }
    this.authService.redirectUrl = this.router.url.split('?')[0];
  }

}
