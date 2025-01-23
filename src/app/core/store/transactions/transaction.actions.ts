import { createAction, props }  from "@ngrx/store";
import {BasketTransaction} from "./transaction.state";

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
