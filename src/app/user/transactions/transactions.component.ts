import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {TransactionResponse, TransactionService} from "../../core/services/transactions/transaction.service";
import {AccountService, BankAccount} from "../../core/services/accounts/account.service";
import {data} from "autoprefixer";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {
  ScheduledTransferResponse,
  ScheduledTransfersService
} from "../../core/services/scheduledTransfer/scheduled-transfers.service";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    DatePipe,
    NgForOf,
    FormsModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit{

  transactions: TransactionResponse[] = [];
  scheduledTransfers: ScheduledTransferResponse[] = [];
  errorMessage = '';
  successMessage = '';
  currentPage = 0;
  pageSize = 10;
  hasMoreTransactions = true;
  hasMoreScheduled = true;
  isLoading = false;

  accounts: BankAccount[] = [];
  selectedAccountId: number | null = null;

  constructor(private transactionService : TransactionService,
              private scheduledTransferService: ScheduledTransfersService,
              private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchUserAccounts();

    this.route.paramMap.subscribe(params => {
      const accountIdParam = params.get('accountId');
      if(accountIdParam) {
        const accountId = +accountIdParam;
        this.selectedAccountId = accountId;
        this.fetchTransactions(accountId, this.currentPage, this.pageSize);
        this.fetchScheduledTransfers(accountId, this.currentPage, this.pageSize);
      } else {
        this.transactions = [];
        this.scheduledTransfers = [];
        this.selectedAccountId = null;
      }
    });
  }

  fetchUserAccounts() {
    this.isLoading = true;
    this.accountService.getBankAccounts(this.currentPage, this.pageSize).subscribe(
      (data: BankAccount[]) => {
        this.accounts = data;
        this.isLoading = false;
      },
      (error: any) => {
        this.errorMessage = 'Failed to load accounts. Please try again later.';
        console.error(error);
        this.isLoading = false;
      }
    );
  }


  fetchTransactions( accountId: number,page: number, size: number) {
    this.isLoading = true;
    this.transactionService.getUserTransactionsByAccount(accountId,page, size).subscribe({
      next: (data: TransactionResponse[]) => {
        this.transactions = data;
        this.hasMoreTransactions = (data.length === size);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load transactions.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  fetchScheduledTransfers(accountId: number, page: number, size: number) {
    this.isLoading = true;
    this.scheduledTransferService.getScheduledTransfersByAccount(accountId, page, size).subscribe({
      next: (data: ScheduledTransferResponse[]) => {
        this.scheduledTransfers = data;
        this.hasMoreScheduled = (data.length === size);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load scheduled transfers.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  getAccountType(account: BankAccount): string {
    if(account.accountType === 'Checking') {
      return 'Checking Account';
    } else if (account.accountType === 'Savings') {
      return 'Savings Account';
    } else {
      return 'Bank Account';
    }
  }

  onAccountSelect(accountId: number | null) {
    if(accountId !== null) {
      this.router.navigate(['/user','transactions', accountId]);
      this.currentPage = 0;
    }

  }

  goToNextPage() {
    if(this.hasMoreTransactions || this.hasMoreScheduled) {
      this.currentPage++;
      if(this.selectedAccountId !== null) {
        this.fetchTransactions(this.selectedAccountId,this.currentPage, this.pageSize);
        this.fetchScheduledTransfers(this.selectedAccountId, this.currentPage, this.pageSize);
      }
    }
  }

  goToPreviousPage() {
    if(this.currentPage > 0) {
      this.currentPage--;
      if(this.selectedAccountId !== null) {
        this.fetchTransactions(this.selectedAccountId, this.currentPage, this.pageSize);
        this.fetchScheduledTransfers(this.selectedAccountId, this.currentPage, this.pageSize);
      }
    }
  }

}
