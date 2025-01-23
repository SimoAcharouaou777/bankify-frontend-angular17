import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BasketState} from "./transaction.state";

export const selectBasketState = createFeatureSelector<BasketState>('basket');

export const selectBasketTransactions = createSelector(
  selectBasketState,
  (state) => state.transactions
);

export const selectBasketTotal = createSelector(
  selectBasketState,
  (state) => state.totalAmount
);

export const selectBasketError = createSelector(
  selectBasketState,
  (state) => state.error
);
