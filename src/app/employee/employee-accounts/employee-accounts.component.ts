import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgClass, NgForOf, TitleCasePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {AccountsService} from "../../core/services/employee/employee-accounts/accounts.service";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-employee-accounts',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    SidebarComponent,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './employee-accounts.component.html',
  styleUrl: './employee-accounts.component.css'
})
export class EmployeeAccountsComponent implements OnInit{
  accounts: any[] = [];
  errorMessage: string = '';

  constructor(private accountService: AccountsService) {}

  ngOnInit(): void { this.getAccounts(); }

  getAccounts(): void {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (error) => {
        this.errorMessage = 'Error loading accounts: ' + error;
      }
    });
  }

}
