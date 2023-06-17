import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from "./client/auth/role-guard.service";
import {AuthGuard} from "./client/auth/auth-guard.service";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client/student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['student']}
  },
  {
    path: '',
    loadChildren: () => import('./client/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['recruiter']}
  },
  {
    path: 'auth',
    loadChildren: () => import('./client/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

