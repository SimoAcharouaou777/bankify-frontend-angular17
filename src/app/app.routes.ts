import {RouterModule, Routes} from '@angular/router';
import { LoginComponent} from "./auth/login/login.component";
import { SignupComponent} from "./auth/signup/signup.component";
import {NgModule} from "@angular/core";
import {roleGuard} from "./core/guards/role.guard";
import {HomeComponent} from "./home/home.component";
import {authGuard} from "./core/guards/auth.guard";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {TransactionEffects} from "./core/store/transactions/transaction.effects";


export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [authGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [authGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full'},

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
  },
  { path: '**', redirectTo: '/home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), EffectsModule.forRoot([TransactionEffects])],
  exports: [RouterModule],
})
export class AppRoutingModule { }
