import { Component, OnInit } from '@angular/core';
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
    if (!this.user.address){
      this.user.address = { city: null, subCity: null, neighborhood: null };
    }
    if (!this.user.contact){
      this.user.contact = { phone: null, email: null };
    }


  }

  avatarChanged(imageFile){
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener('load', () => this.user.avatar = String(reader.result));
    this.newAvatar = imageFile;
  }

  removeAvatar(){
    this.newAvatar = null;
    this.user.avatar = null;
  }

  onSave(){
    this.userService.updateUser(this.user, this.newAvatar).subscribe(res => {
      this.authService.currentUser = this.user;
      this.authService.userChanged.emit();
      this.router.navigate(['..'], {
        relativeTo: this.route,
      });
    });
  }
}
