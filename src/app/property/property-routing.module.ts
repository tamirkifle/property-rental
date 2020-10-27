import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyCenterComponent } from './property-center/property-center.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
import {
  PropertyResolver,
  PropertiesResolver, FavoritesResolver, PropertyUserResolver, UserPostsResolver
} from './property-resolver.service';
import { Property } from './property';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { RoleGuard } from '../auth/role.guard';
import { CanEditGuard } from '../auth/can-edit.guard';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { EditProfileComponent } from '../user/edit-profile/edit-profile.component';

const propertyRoutes: Routes = [
  {
    path: 'properties',
    component: PropertyCenterComponent,
    children: [
      {
        path: '',
        component: PropertyListComponent,
        resolve: { properties: PropertiesResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
      {
        path: 'detail/:id',
        component: PropertyDetailComponent,
        resolve: { property: PropertyResolver, user: PropertyUserResolver },
      },
      {
        path: 'detail/:id/edit',
        component: EditPropertyComponent,
        resolve: { property: PropertyResolver},
        canDeactivate: [CanDeactivateGuard],
        // canActivate: [RoleGuard, CanEditGuard],
      },
      {
        path: 'myposts',
        component: PropertyListComponent,
        resolve: { properties: UserPostsResolver},
        canActivate: [RoleGuard],
      },
      {
        path: 'myprofile',
        component: UserProfileComponent,
        canActivate: [RoleGuard],
      },
      {
        path: 'myprofile/edit',
        component: EditProfileComponent,
        canActivate: [RoleGuard],
      },
      {
        path: 'favorites',
        component: PropertyListComponent,
        canActivate: [RoleGuard],
        resolve: { properties: FavoritesResolver },
      },
      {
        path: 'create',
        component: CreatePropertyComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(propertyRoutes)],
  exports: [RouterModule],
})
export class PropertyRoutingModule {}
