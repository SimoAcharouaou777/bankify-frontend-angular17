import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";

interface Transaction {
  date: string;
  description: string;
  amount: string;
  status: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    transactions: Transaction[] = [
      {
        date: '2021-01-01',
        description: 'Payment for January',
        amount: '-$120.00',
        status: 'Pending'
      },
      {
        date: '2023-09-28',
        description: 'Salary',
        amount: '+$3,000.00',
        status: 'Completed'
      },
      {
        date: '2023-09-25',
        description: 'Grocery Shopping',
        amount: '-$85.50',
        status: 'Completed'
      },
      {
        date: '2023-09-20',
        description: 'Gym Membership',
        amount: '-$50.00',
        status: 'Pending'
      }
    ];
}
