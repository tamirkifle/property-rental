import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { FeaturedComponent } from './featured/featured.component';
import { PropertyCenterComponent } from './property-center/property-center.component';
import { CreatePropertyComponent } from './create-property/create-property.component';

const propertyRoutes: Routes = [
  {
    path: 'properties',
    component: PropertyCenterComponent,
    children: [
      { path: '', component: PropertyListComponent},
      { path: 'detail/:id', component: PropertyDetailComponent },
      { path: 'home', component: FeaturedComponent },
      { path: 'create', component: CreatePropertyComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(propertyRoutes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
