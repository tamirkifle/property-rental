import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { FeaturedComponent } from './featured/featured.component';
import { PropertyCenterComponent } from './property-center/property-center.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { PropertyResolver, PropertiesResolver } from './property-resolver.service';
import { Property } from './property';
import { EditPropertyComponent } from './edit-property/edit-property.component';

const propertyRoutes: Routes = [
  {
    path: 'properties',
    component: PropertyCenterComponent,
    children: [
      { path: '', component: PropertyListComponent, resolve: {properties: PropertiesResolver} },
      { path: 'detail/:id', component: PropertyDetailComponent, resolve: {property: PropertyResolver} },
      { path: 'detail/:id/edit', component: EditPropertyComponent, resolve: {property: PropertyResolver} },
      { path: 'home', component: FeaturedComponent, resolve: {properties: PropertiesResolver} },
      { path: 'create', component: CreatePropertyComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(propertyRoutes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
