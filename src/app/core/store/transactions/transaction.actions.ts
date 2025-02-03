import { createAction, props } from "@ngrx/store";
import { BasketTransaction } from "./transaction.state";

export const addToBasket = createAction(
  '[Basket] Add Transaction',
  props<{ transaction: BasketTransaction }>()
);

export const removeFromBasket = createAction(
  '[Basket] Remove Transaction',
  props<{ transactionId: string }>()
);

export const clearBasket = createAction('[Basket] Clear Transactions');
export const validateBasket = createAction('[Basket] Validate');

export const progressTransaction = createAction(
  '[Basket] Progress Transaction',
  props<{ transactionId: string }>()
);

export const progressAllTransactions = createAction(
  '[Basket] Progress All Transactions'
);

export const progressTransactionSuccess = createAction(
  '[Basket] Progress Transaction Success',
  props<{ transactionId: string; response?: any }>()
);

export const progressTransactionFailure = createAction(
  '[Basket] Progress Transaction Failure',
  props<{ error: any }>()
);

export const initiateProgressTransaction = createAction(
  '[Basket] initiate Progress Transaction',
  props<{ transaction: BasketTransaction }>()
);
