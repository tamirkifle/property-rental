import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { AddEditPropertyComponent } from './add-edit-property/add-edit-property.component';
import {
  PropertyResolver,
  PropertiesResolver, FavoritesResolver, PropertyUserResolver, UserPostsResolver
} from './property-resolver.service';
import { Property } from './property';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { RoleGuard } from '../auth/role.guard';
import { CanEditGuard } from '../auth/can-edit.guard';
import { RelatedListResolver } from './property-resolver.service';

const propertyRoutes: Routes = [
  {
    path: 'properties',
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
        resolve: { property: PropertyResolver, user: PropertyUserResolver, relatedItems: RelatedListResolver},
      },
      {
        path: 'detail/:id/edit',
        component: AddEditPropertyComponent,
        resolve: { property: PropertyResolver},
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard, CanEditGuard],
      },
      {
        path: 'myposts',
        component: PropertyListComponent,
        resolve: { properties: UserPostsResolver},
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
        component: AddEditPropertyComponent,
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
