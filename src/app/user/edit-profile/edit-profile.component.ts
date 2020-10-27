import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User;
  newAvatar: File = null;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  avatarChanged(imageFile){
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener('load', () => this.user.avatar = String(reader.result));
    this.newAvatar = imageFile;
  }

  updateProfile(user){
    this.userService.updateUser(user, this.newAvatar).subscribe(res => {
      this.authService.currentUser = this.user;
      this.userService.profileChanged.emit();
      this.router.navigate(['..'], {
        relativeTo: this.route,
      });
    });
  }
}