import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCenterComponent } from './admin-center/admin-center.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminPropertiesComponent } from './admin-properties/admin-properties.component';
import { AdminGuard } from '../auth/admin.guard';
import { PropertyDetailComponent } from '../property/property-detail/property-detail.component';
import { PropertiesResolver, PropertyResolver, PropertyUserResolver, RelatedListResolver, UsersResolver } from '../property/property-resolver.service';
import { AddEditPropertyComponent } from '../property/add-edit-property/add-edit-property.component';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { RoleGuard } from '../auth/role.guard';
import { CanEditGuard } from '../auth/can-edit.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminCenterComponent,
    canActivate: [AdminGuard],
    resolve: { properties: PropertiesResolver, users: UsersResolver },
    children: [
      { path: 'users', component: AdminUsersComponent },
      {
        path: 'properties',
        component: AdminPropertiesComponent,
      },
      {
        path: 'properties/detail/:id',
        component: PropertyDetailComponent,
        resolve: { property: PropertyResolver, user: PropertyUserResolver, relatedItems: RelatedListResolver }
      },
      {
        path: 'properties/detail/:id/edit',
        component: AddEditPropertyComponent,
        resolve: { property: PropertyResolver},
        canDeactivate: [CanDeactivateGuard],
        canActivate: [RoleGuard, CanEditGuard],
      },
      { path: 'home', component: AdminHomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
