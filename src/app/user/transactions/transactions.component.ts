import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {TransactionResponse, TransactionService} from "../../core/services/transactions/transaction.service";
import {AccountService} from "../../core/services/accounts/account.service";
import {data} from "autoprefixer";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit{

  transactions: TransactionResponse[] = [];
  errorMessage = '';
  currentPage = 0;
  pageSize = 10;
  hasMore = true;
  isLoading = false;

  constructor(private transactionService : TransactionService) { }

  ngOnInit(): void { this.fetchTransactions(this.currentPage, this.pageSize)}

  fetchTransactions(page: number, size: number) {
    this.isLoading = true;
    this.transactionService.getUserTransactions(page, size).subscribe({
      next: (data) => {
        this.transactions = data;
        this.hasMore = (data.length === size);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load transactions.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  goToNextPage() {
    if(this.hasMore) {
      this.currentPage++;
      this.fetchTransactions(this.currentPage, this.pageSize);
    }
  }

  goToPreviousPage() {
    if(this.currentPage > 0) {
      this.currentPage--;
      this.fetchTransactions(this.currentPage, this.pageSize);
    }
  }
}
