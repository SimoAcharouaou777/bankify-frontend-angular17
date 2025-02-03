import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AsyncPipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import {
  AccountService,
  BankAccount,
  TransactionRequest,
  TransferRequest
} from "../../core/services/accounts/account.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Observable} from "rxjs";
import {BasketTransaction} from "../../core/store/transactions/transaction.state";
import {Store} from "@ngrx/store";
import {
  selectBasketError,
  selectBasketTotal,
  selectBasketTransactions
} from "../../core/store/transactions/transaction.selectors";
import {
  addToBasket,
  clearBasket,
  removeFromBasket,
  validateBasket,
  progressTransaction,
  progressAllTransactions
} from "../../core/store/transactions/transaction.actions";

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    DecimalPipe,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit{

  depositForm: FormGroup;
  withdrawForm: FormGroup;
  transferForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  userAccounts: BankAccount[] = [];
  basketTransactions$: Observable<BasketTransaction[]>;
  basketTotal$: Observable<number>;
  basketError$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private store: Store
  ) {
    this.depositForm = this.fb.group({
      accountId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.withdrawForm = this.fb.group({
      accountId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.transferForm = this.fb.group({
      fromAccount: ['', [Validators.required]],
      toAccountNumber: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      transactionType: ['CLASSIC', [Validators.required]],
      frequency: ['']
    });
    this.basketTransactions$ = this.store.select(selectBasketTransactions);
    this.basketTotal$ = this.store.select(selectBasketTotal);
    this.basketError$ = this.store.select(selectBasketError);
  }

  get isPermanentTransfer(): boolean {
    return this.transferForm?.value.transactionType === 'PERMANENT';
  }
  removeTransaction(transactionId: string): void {
    this.store.dispatch(removeFromBasket({ transactionId }));
  }

  clearAllTransactions(): void {
    this.store.dispatch(clearBasket());
  }

  onProgress(transactionId: string): void {
    this.store.dispatch(progressTransaction({ transactionId }));
  }

  onProgressAll(): void {
    this.store.dispatch(progressAllTransactions());
  }

  ngOnInit(): void {
    this.fetchUserAccounts();
  }

  onDeposit(): void {
    if (this.depositForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }
    const basketTransaction: BasketTransaction = {
      id: uuidv4(),
      type: 'DEPOSIT',
      amount: Number(this.depositForm.value.amount),
      accountId: this.depositForm.value.accountId,
      status: 'PENDING'
    };
    this.store.dispatch(addToBasket({transaction: basketTransaction}));
    this.store.dispatch(validateBasket());
    this.depositForm.reset();

  }

  onWithdraw(): void {
    if(this.withdrawForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const basketTransaction: BasketTransaction = {
      id: uuidv4(),
      type: 'WITHDRAW',
      accountId: this.withdrawForm.value.accountId,
      amount: Number(this.withdrawForm.value.amount),
      status: 'PENDING'
    };

    this.store.dispatch(addToBasket({ transaction: basketTransaction }));
    this.withdrawForm.reset();

  }

  onTransfer(): void {
    if(this.transferForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const fromAccount = Number(this.transferForm.value.fromAccount);
    const toAccount = this.transferForm.value.toAccountNumber;

    if(fromAccount === toAccount) {
      this.errorMessage = 'Cannot transfer funds to the same account.';
      return;
    }

    if(this.isPermanentTransfer && !this.transferForm.value.frequency) {
      this.errorMessage = 'Please select a frequency for permanent transfers.';
      return;
    }

    const basketTransaction: BasketTransaction = {
      id: uuidv4(),
      type: 'TRANSFER',
      amount: Number(this.transferForm.value.amount),
      fromAccountId: this.transferForm.value.fromAccount,
      toAccountId: this.transferForm.value.toAccountNumber,
      frequency: this.transferForm.value.frequency,
      status: 'PENDING'
    };

    this.store.dispatch(addToBasket({ transaction: basketTransaction }));
    this.transferForm.reset({transactionType: 'CLASSIC'});

  }

  fetchUserAccounts(): void {
    this.accountService.getBankAccounts().subscribe(
      (accounts) => {
        this.userAccounts = accounts;
      },
      (error) => {
        this.errorMessage = 'Failed to load accounts. Please try again.';
      }
    );
  }

}
