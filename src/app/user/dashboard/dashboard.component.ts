import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {Transaction, TransactionService} from "../../core/services/transactions/transaction.service";
import {DashboardService} from "../../core/services/Dashboard/dashboard.service";
import {data} from "autoprefixer";

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
    totalBalance: number = 0;
    activeAccounts: number = 0;
    pendingTransactions: number = 0;
    recentTransactions: any[] = [];
    isLoading: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private dashboardService: DashboardService) { }


  ngOnInit(): void { this.fetchDashboardSummary(); }

  fetchDashboardSummary(): void {
      this.isLoading = true;
      this.dashboardService.getDashboardSummary().subscribe({
        next: (data) => {
          this.totalBalance = data.totalBalance;
          this.activeAccounts = data.activeAccounts;
          this.pendingTransactions = data.pendingTransactions;
          this.recentTransactions = data.recentTransactions;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to load dashboard summary';
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
