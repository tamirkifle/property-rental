import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLineComponent } from './user-line/user-line.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserLineComponent,
    UserDetailComponent,
    UserProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    UserDetailComponent,
    UserLineComponent
  ]
})
export class UserModule { }
