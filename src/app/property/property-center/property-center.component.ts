import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-property-center',
  templateUrl: './property-center.component.html',
  styleUrls: ['./property-center.component.css'],
})
export class PropertyCenterComponent implements OnInit {
  searchTerm = '';
  avatar = '';
  userFirstName = '';
  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('s') || '';
    });
    this.avatar = this.authService.currentUser ? this.authService.currentUser.avatar: 'assets/other_icons/profile.png';
    this.userFirstName = this.authService.currentUser ? this.authService.currentUser.firstname: 'Profile';

    if(this.authService.currentUser){
      this.avatar = this.authService.currentUser.avatar;
      this.userFirstName = this.authService.currentUser.firstname;
    }

    console.log('check: ', this.avatar, this.userFirstName)
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { s: searchTerm },
      // queryParamsHandling: 'merge',
    });
  }

  logout(){
    this.authService.logout();
    this.avatar = 'assets/other_icons/profile.png';
    this.userFirstName = 'Profile';
  }
}
