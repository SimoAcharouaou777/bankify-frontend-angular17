import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";

interface BankAccount {
  accountType: string;
  accountNumber: string;
  balance: string;
}
@Component({
  selector: 'app-accounts',
  standalone: true,
    imports: [
        SidebarComponent
    ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accounts: BankAccount[] = [
    {
      accountType: 'Checking Account',
      accountNumber: '123456789',
      balance: '$5,000.00'
    },
    {
      accountType: 'Savings Account',
      accountNumber: '987654321',
      balance: '$15,000.00'
    },
    {
      accountType: 'Investment Account',
      accountNumber: '456123789',
      balance: '$25,000.00'
    }
  ];
}
