import {Component, OnInit} from '@angular/core';
import {TransactionsService} from "../../core/services/employee/emoloyee-transaction/transactions.service";
import {CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-employee-transactions',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgClass,
    NgForOf,
    NgIf,
    SidebarComponent,
    CurrencyPipe
  ],
  templateUrl: './employee-transactions.component.html',
  styleUrl: './employee-transactions.component.css'
})
export class EmployeeTransactionsComponent implements OnInit{
  transactions: any[] = [];
  errorMessage: string = '';

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void { this.getTransactions(); }

  getTransactions(): void {
    this.transactionsService.getPendingTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {
        this.errorMessage = 'Error loading transactions: ' + error.message;
      },
    });
  }

  approveTransaction(transactionId: number): void {
    this.transactionsService.approveTransaction(transactionId).subscribe({
      next: () => {
        console.log(`Transaction with ID: ${transactionId} approved successfully`);
        this.getTransactions();
      },
      error: (error) => {
        console.error(`Error approving transaction: ${error.message}`);
      },
    });
  }

  rejectTransaction(transactionId: number): void {
    this.transactionsService.rejectTransaction(transactionId).subscribe({
      next: () => {
        console.log(`Transaction with ID: ${transactionId} rejected successfully`);
        this.getTransactions();
      },
      error: (error) => {
        console.error(`Error rejecting transaction: ${error.message}`);
      },
    });
  }

}
