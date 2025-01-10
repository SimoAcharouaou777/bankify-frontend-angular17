import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  pendingTransactions: number = 0;
  pendingLoans: number = 0;
  pendingInvoices: number = 0;
  recentPendingItems: any[] = [];

  ngOnInit(): void { this.fetchDashboardData(); }

  fetchDashboardData(): void {
    this.pendingTransactions = 5;
    this.pendingLoans = 3;
    this.pendingInvoices = 2;

    this.recentPendingItems = [
      { id: 1, type: 'Transaction', description: 'Pending transaction #1', date: new Date() },
      { id: 2, type: 'Loan', description: 'Loan application #45', date: new Date() },
      { id: 3, type: 'Invoice', description: 'Invoice #789', date: new Date() },
    ];
  }

  approveItem(id: number, type: string): void {
    console.log(`Approving ${type} with ID: ${id}`);
  }

  rejectItem(id: number, type: string): void {
    console.log(`Rejecting ${type} with ID: ${id}`);
  }

}
