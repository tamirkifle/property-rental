import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyItemComponent } from './property-item/property-item.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { AddEditPropertyComponent } from './add-edit-property/add-edit-property.component';
import { FormsModule } from '@angular/forms';
import { FilterByPipe } from '../shared/filter-by.pipe';
import { PropertyFilterPipe } from '../shared/property-filter.pipe';
import { RelatedListComponent } from './related-list/related-list.component';



@NgModule({
  declarations: [
    PropertyItemComponent,
    PropertyListComponent,
    PropertyDetailComponent,
    AddEditPropertyComponent,
    RelatedListComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    SharedModule,
    PropertyRoutingModule,
    FormsModule,
  ],
  exports: [
    PropertyItemComponent,
    PropertyListComponent,
    PropertyDetailComponent,
  ],
  providers: [FilterByPipe, PropertyFilterPipe]
})
export class PropertyModule { }
