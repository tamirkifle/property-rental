import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyItemComponent } from './property-item/property-item.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { FeaturedComponent } from './featured/featured.component';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { PropertyCenterComponent } from './property-center/property-center.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PropertyItemComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    FeaturedComponent,
    PropertyCenterComponent,
    CreatePropertyComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    SharedModule,
    PropertyRoutingModule,
    FormsModule
  ],
  exports: [
    PropertyItemComponent,
    PropertyListComponent,
    PropertyDetailComponent,
  ]
})
export class PropertyModule { }
