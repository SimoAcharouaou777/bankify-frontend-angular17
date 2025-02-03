// src/app/core/store/transactions/transaction.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TransactionActions from './transaction.actions';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import {AuthService} from "../../services/auth.service";
import { Store } from '@ngrx/store';
import { selectBasketTransactions } from './transaction.selectors';
import { BasketTransaction } from './transaction.state';
import {AccountService} from "../../services/accounts/account.service";

@Injectable()
export class TransactionEffects {
  progressAllTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.progressAllTransactions),
      withLatestFrom(this.store.select(selectBasketTransactions)),
      switchMap(([action, transactions]) => {
        if (!transactions || transactions.length === 0) {
          console.log('No transactions to process.');
          return of([]); // or dispatch an appropriate action
        }
        // For each transaction, call the correct API and log it
        const observables = transactions.map((transaction: BasketTransaction) => {
          switch (transaction.type) {
            case 'DEPOSIT':
              console.log('Processing DEPOSIT:', transaction);
              return this.accountService.depositMoney({
                accountId: Number(transaction.accountId),
                amount: transaction.amount
              }).pipe(
                map(response => {
                  console.log('Deposit success:', response);
                  return TransactionActions.progressTransactionSuccess({ transactionId: transaction.id, response });
                }),
                catchError(error => {
                  console.error('Deposit error:', error);
                  return of(TransactionActions.progressTransactionFailure({ error }));
                })
              );
            case 'WITHDRAW':
              console.log('Processing WITHDRAW:', transaction);
              return this.accountService.withdrawMoney({
                accountId: Number(transaction.accountId),
                amount: transaction.amount
              }).pipe(
                map(response => {
                  console.log('Withdraw success:', response);
                  return TransactionActions.progressTransactionSuccess({ transactionId: transaction.id, response });
                }),
                catchError(error => {
                  console.error('Withdraw error:', error);
                  return of(TransactionActions.progressTransactionFailure({ error }));
                })
              );
            case 'TRANSFER':
              console.log('Processing TRANSFER:', transaction);
              return this.accountService.transferFunds({
                fromAccount: Number(transaction.fromAccountId),
                toAccountNumber: transaction.toAccountId as string,
                amount: transaction.amount,
                transactionType: 'CLASSIC', // default or use transaction.transactionType if defined
                frequency: transaction.frequency
              }).pipe(
                map(response => {
                  console.log('Transfer success:', response);
                  return TransactionActions.progressTransactionSuccess({ transactionId: transaction.id, response });
                }),
                catchError(error => {
                  console.error('Transfer error:', error);
                  return of(TransactionActions.progressTransactionFailure({ error }));
                })
              );
            default:
              console.error('Invalid transaction type:', transaction);
              return of(TransactionActions.progressTransactionFailure({ error: 'Invalid transaction type' }));
          }
        });
        // Use forkJoin to process all observables concurrently
        return forkJoin(observables);
      }),
      mergeMap(actionsArray => actionsArray) // Flatten the resulting array of actions
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private store: Store
  ) {}
}
