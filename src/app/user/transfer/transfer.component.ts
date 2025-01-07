import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  AccountService,
  BankAccount,
  TransactionRequest,
  TransferRequest
} from "../../core/services/accounts/account.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    ReactiveFormsModule,
    NgForOf
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

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
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
  }

  get isPermanentTransfer(): boolean {
    return this.transferForm?.value.transactionType === 'PERMANENT';
  }
  ngOnInit(): void {
    this.fetchUserAccounts();
  }

  onDeposit(): void {
    if(this.depositForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }
    const transaction: TransactionRequest = {
      accountId: Number(this.depositForm.value.accountId),
      amount: Number(this.depositForm.value.amount)
    };

    if(transaction.amount <= 0) {
      this.errorMessage = 'Please enter a valid amount.';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.accountService.depositMoney(transaction).subscribe(
      (response) => {
        this.successMessage = 'Deposit successful.';
        this.isLoading = false;
        this.depositForm.reset();
      },
      (error) => {
        if(error.status === 403) {
          this.errorMessage = 'You do not have permission to perform this operation';
        } else if (error.status === 400) {
          this.errorMessage = error.error.message || 'Invalid account or amount.';
        } else {
          this.errorMessage = 'Failed to deposit money. Please try again.';
        }
        this.isLoading = false;
      }
    );
  }

  onWithdraw(): void {
    if(this.withdrawForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const transaction: TransactionRequest = {
      accountId: Number(this.withdrawForm.value.accountId),
      amount: Number(this.withdrawForm.value.amount)
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.accountService.withdrawMoney(transaction).subscribe(
      (response) => {
        this.successMessage = 'Money withdrawn successfully!';
        this.isLoading = false;
        this.withdrawForm.reset();
      },
      (error) => {
        this.errorMessage = error?.error?.message || 'Failed to withdraw money. Please try again.';
        this.isLoading = false;
      }
    );
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

    const transfer: TransferRequest = {
      fromAccount: fromAccount,
      toAccountNumber: toAccount,
      amount: Number(this.transferForm.value.amount),
      transactionType: this.transferForm.value.transactionType,
      frequency: this.transferForm.value.frequency
    };

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.accountService.transferFunds(transfer).subscribe(
      (response) => {
        this.successMessage = 'Transfer successful!';
        this.isLoading = false;
        this.transferForm.reset({transactionType: 'CLASSIC'});
        this.fetchUserAccounts();
      },
      (error) => {
        this.errorMessage = error?.error?.message || 'Failed to transfer funds. Pleas try again.';
        this.isLoading = false;
      }
    );
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
