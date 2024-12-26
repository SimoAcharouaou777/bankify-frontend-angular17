import {RouterModule, Routes} from '@angular/router';
import { LoginComponent} from "./auth/login/login.component";
import { SignupComponent} from "./auth/signup/signup.component";
import {NgModule} from "@angular/core";
import {roleGuard} from "./core/guards/role.guard";


export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [roleGuard],
    data: { expectedRole: 'EMPLOYEE' }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [roleGuard],
    data: { expectedRole: 'USER' }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
