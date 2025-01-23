export interface BasketTransaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
  amount: number;
  accountId?: string;
  fromAccountId?: string;
  toAccountId?: string;
  frequency?: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface BasketState {
  transactions: BasketTransaction[];
  totalAmount: number;
  error: string | null;
}

export const initialBasketState: BasketState = {
  transactions: [],
  totalAmount: 0,
  error: null,
};
