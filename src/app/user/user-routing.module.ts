import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import {AccountsComponent} from "./accounts/accounts.component";
import {TransactionsComponent} from "./transactions/transactions.component";
import {ProfileComponent} from "./profile/profile.component";
import {TransferComponent} from "./transfer/transfer.component";
import {LoansComponent} from "./loans/loans.component";
import {InvoicesComponent} from "./invoices/invoices.component";
import {provideState} from "@ngrx/store";
import {basketReducer} from "../core/store/transactions/transaction.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TransactionEffects} from "../core/store/transactions/transaction.effects";

export const routes: Routes = [
  {
    path: '', providers: [provideState('basket', basketReducer)],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'transactions/:accountId', component: TransactionsComponent},
      {path: 'transactions', component: TransactionsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'transfer', component: TransferComponent},
      {path: 'loans', component: LoansComponent},
      {path: 'invoices', component: InvoicesComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
