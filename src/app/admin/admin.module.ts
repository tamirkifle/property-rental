import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminCenterComponent } from './admin-center/admin-center.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPropertiesComponent } from './admin-properties/admin-properties.component';
import { SharedModule } from '../shared/shared.module';
import { PropertyModule } from '../property/property.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [AdminCenterComponent, AdminPropertiesComponent, AdminUsersComponent, AdminHomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    PropertyModule,
    UserModule
  ]
})
export class AdminModule { }
