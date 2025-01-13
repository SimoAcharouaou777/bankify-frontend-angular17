import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, TitleCasePipe} from "@angular/common";
import {DashboardService} from "../../core/services/employee/employee-dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    DatePipe,
    NgForOf,
    NgClass,
    TitleCasePipe,
    CurrencyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  pendingTransactions: number = 0;
  pendingLoans: number = 0;
  pendingInvoices: number = 0;
  recentPendingItems: any[] = [];
  recentTransactions: any[] = [];


  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void { this.loadDashboardSummary(); this.getRecentTransaction(); }

  loadDashboardSummary(): void {
    this.dashboardService.getDashboardDataSummary().subscribe({
      next: (data) => {
        this.pendingTransactions = data.pendingTransactions;
        this.pendingLoans = data.pendingLoans;
        this.pendingInvoices = data.pendingInvoices;
        this.recentPendingItems = data.recentPendingItems || [];
      },
      error: (error) => {
        console.error('Error loading dashboard summary:', error);
      }
    });
  }

  getRecentTransaction(): void {
    this.dashboardService.getRecentTransactions().subscribe({
      next: (data) => {
        this.recentTransactions = data.recentTransactions || [];
      },
      error: (error) => {
        console.error('Error loading recent transactions:', error);
      }
    });
  }

  approveItem(itemId: number, itemType: string): void {
    let approveCall;

    if(itemType === 'Transaction') {
      approveCall = this.dashboardService.approveTransaction(itemId);
    } else if(itemType === 'Loan') {
      approveCall = this.dashboardService.approveLoan(itemId)
    } else if (itemType === 'Invoice') {
      approveCall = this.dashboardService.approveInvoice(itemId);
    }

    approveCall?.subscribe({
      next: () => {
        console.log(`${itemType} with ID: ${itemId} approved successfully`);
        this.loadDashboardSummary();
      },
      error: (error) => {
        console.error(`Error approving ${itemType} with ID: ${itemId}`, error);
      }
    });
  }

  rejectItem(itemId: number, itemType: string): void {
    let rejectCall;
    if(itemType === 'Transaction') {
      rejectCall = this.dashboardService.rejectTransaction(itemId);
    } else if (itemType === 'Loan') {
      rejectCall = this.dashboardService.rejectLoan(itemId);
    } else if (itemType === 'Invoice') {
      rejectCall = this.dashboardService.rejectInvoice(itemId);
    }

    rejectCall?.subscribe({
      next: () => {
        console.log(`${itemType} with ID: ${itemId} rejected successfully`);
        this.loadDashboardSummary();
      },
      error: (error) => {
        console.error(`Error rejecting ${itemType} with ID: ${itemId}`, error);
      }
    });
  }
}
