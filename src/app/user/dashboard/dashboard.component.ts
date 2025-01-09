import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {Transaction, TransactionService} from "../../core/services/transactions/transaction.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    SidebarComponent,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    transactions: Transaction[] = [];
    isLoading: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private transactionService: TransactionService) { }


  ngOnInit(): void { this.fetchTransactions(); }

  fetchTransactions(): void {
    this.isLoading = true;
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
        this.clearMessages();
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        this.clearMessages();
      }
    });
  }

  clearMessages(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    },  5000);
  }
}
