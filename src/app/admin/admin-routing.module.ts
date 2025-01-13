import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./manage-users/users/users.component";
import {AccountsComponent} from "./manage-accounts/accounts/accounts.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersComponent},
  {path: 'accounts', component: AccountsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
