import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EmployeeAccountsComponent} from "./employee-accounts/employee-accounts.component";
import {EmployeeTransactionsComponent} from "./employee-transactions/employee-transactions.component";
import {EmployeeLoansComponent} from "./employee-loans/employee-loans.component";
import {EmployeeInvoicesComponent} from "./employee-invoices/employee-invoices.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: EmployeeAccountsComponent },
  { path: 'transactions', component: EmployeeTransactionsComponent },
  { path: 'loans', component: EmployeeLoansComponent },
  { path: 'invoices', component: EmployeeInvoicesComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
