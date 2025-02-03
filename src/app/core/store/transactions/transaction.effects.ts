import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TransactionActions from './transaction.actions';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  mergeMap
} from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { AccountService } from '../../services/accounts/account.service';
import { Store } from '@ngrx/store';
import { selectBasketTransactions } from './transaction.selectors';
import { BasketTransaction } from './transaction.state';

@Injectable()
export class TransactionEffects {

  /**
   * Effect to process a single transaction when the initiateProgressTransaction action is dispatched.
   * This effect makes the appropriate HTTP call based on the transaction type and then dispatches
   * either a success or failure action.
   */
  progressTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.initiateProgressTransaction),
      switchMap(({ transaction }) => {
        switch (transaction.type) {
          case 'DEPOSIT':
            console.log('Processing DEPOSIT:', transaction);
            return this.accountService.depositMoney({
              accountId: Number(transaction.accountId),
              amount: transaction.amount
            }).pipe(
              map(response =>
                TransactionActions.progressTransactionSuccess({
                  transactionId: transaction.id,
                  response
                })
              ),
              catchError(error =>
                of(TransactionActions.progressTransactionFailure({ error }))
              )
            );
          case 'WITHDRAW':
            console.log('Processing WITHDRAW:', transaction);
            return this.accountService.withdrawMoney({
              accountId: Number(transaction.accountId),
              amount: transaction.amount
            }).pipe(
              map(response =>
                TransactionActions.progressTransactionSuccess({
                  transactionId: transaction.id,
                  response
                })
              ),
              catchError(error =>
                of(TransactionActions.progressTransactionFailure({ error }))
              )
            );
          case 'TRANSFER':
            console.log('Processing TRANSFER:', transaction);
            return this.accountService.transferFunds({
              fromAccount: Number(transaction.fromAccountId),
              toAccountNumber: transaction.toAccountId as string,
              amount: transaction.amount,
              transactionType: 'CLASSIC', // or use transaction.transactionType if available
              frequency: transaction.frequency
            }).pipe(
              map(response =>
                TransactionActions.progressTransactionSuccess({
                  transactionId: transaction.id,
                  response
                })
              ),
              // FIX: Added missing closing parenthesis here
              catchError(error =>
                of(TransactionActions.progressTransactionFailure({ error }))
              )
            );
          default:
            console.error('Invalid transaction type:', transaction);
            return of(TransactionActions.progressTransactionFailure({ error: 'Invalid transaction type' }));
        }
      })
      // If you intend to map the output further you could add additional operators here.
      // For example, if you want to always dispatch a success action even if the inner observable already did:
      // , map(({ transactionId, response }) =>
      //     TransactionActions.progressTransactionSuccess({ transactionId })
      // ),
      // catchError(error => of(TransactionActions.progressTransactionFailure({ error })))
    )
  );

  /**
   * Effect to process all transactions in the basket when the progressAllTransactions action is dispatched.
   * This effect retrieves all basket transactions from the store, makes the proper API call for each,
   * and uses forkJoin to process them concurrently. The resulting actions are then merged into a single stream.
   */
  progressAllTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.progressAllTransactions),
      withLatestFrom(this.store.select(selectBasketTransactions)),
      switchMap(([action, transactions]) => {
        if (!transactions || transactions.length === 0) {
          console.log('No transactions to process.');
          return of([]);
        }
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
                  return TransactionActions.progressTransactionSuccess({
                    transactionId: transaction.id,
                    response
                  });
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
                  return TransactionActions.progressTransactionSuccess({
                    transactionId: transaction.id,
                    response
                  });
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
                transactionType: 'CLASSIC',
                frequency: transaction.frequency
              }).pipe(
                map(response => {
                  console.log('Transfer success:', response);
                  return TransactionActions.progressTransactionSuccess({
                    transactionId: transaction.id,
                    response
                  });
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
        return forkJoin(observables);
      }),
      mergeMap(actionsArray => actionsArray)
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private store: Store
  ) {}
}
