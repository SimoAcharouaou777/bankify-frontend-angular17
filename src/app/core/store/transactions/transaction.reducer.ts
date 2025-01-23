import { createReducer, on} from "@ngrx/store";
import { BasketState,initialBasketState} from "./transaction.state";
import * as TransactionActions from "./transaction.actions";

export const basketReducer = createReducer(
  initialBasketState,
  on(TransactionActions.addToBasket, (state, { transaction }) => {
    const updatedTransactions = [...state.transactions, transaction];
    return {
      ...state,
      transactions: updatedTransactions,
      totalAmount: updatedTransactions.reduce((sum, t) => sum + t.amount, 0),
      error: updatedTransactions.length > 10 ? 'Maximum 10 transactions allowed' : null
    };
  }),
  on(TransactionActions.removeFromBasket, (state, { transactionId }) => {
    const updatedTransactions = state.transactions.filter(t => t.id !== transactionId);
    return {
      ...state,
      transactions: updatedTransactions,
      totalAmount: updatedTransactions.reduce((sum, t) => sum + t.amount, 0)
    };
  }),
  on(TransactionActions.clearBasket, () => initialBasketState),
  on(TransactionActions.validateBasket, (state) => ({
    ...state,
    error: state.transactions.length > 10 ? 'Maximum 10 transactions allowed' : null
  }))
);
