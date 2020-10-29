import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './auth/role.guard';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';



const routes: Routes = [
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
  { path: '', redirectTo: '/properties', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
