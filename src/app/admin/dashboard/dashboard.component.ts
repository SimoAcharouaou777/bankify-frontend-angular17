import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NgForOf} from "@angular/common";
import {DashboardService} from "../../core/services/admin/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  totalUsers: number = 0;
  activeAccounts: number = 0;
  inactiveAccounts: number = 0;
  recentUsers: any[] = [];
  recentAccounts: any[] = [];
  errorMessage: string = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void { this.loadDashboardData(); }

  loadDashboardData(): void {
    this.dashboardService.getDashboardSummary().subscribe({
      next: (data) => {
        this.totalUsers = data.totalUsers;
        this.activeAccounts = data.activeAccounts;
        this.inactiveAccounts = data.inactiveAccounts;
        this.recentUsers = data.recentUsers || [];
        this.recentAccounts = data.recentAccounts || [];
      },
      error: (error) => {
        this.errorMessage = 'Error loading dashboard data';
        console.error(error);
      }
    });
  }

  deleteUser(userId: number): void {
    this.dashboardService.deleteUser(userId).subscribe({
      next: () => {
        console.log(`User ${userId} deleted`);
        this.loadDashboardData();
      },
      error: (error) => console.error(`Error deleting user ${userId}`, error)
    });
  }


}
