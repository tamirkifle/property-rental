import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLineComponent } from './user-line/user-line.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [
    UserLineComponent,
    UserDetailComponent,
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  exports: [
    UserDetailComponent,
    UserLineComponent
  ]
})
export class UserModule { }
