import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {AdminService} from "../../../core/services/admin/admin.service";

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    NgForOf,
    NgClass,
    TitleCasePipe,
    CurrencyPipe
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accounts: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private adminService: AdminService) { }
  ngOnInit(): void { this.loadAccounts(); }

  loadAccounts(): void {
    this.adminService.getAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (error) => {
        this.errorMessage = 'Error Loading accounts : ' + error.message;
      },
    });
  }

  updateAccountStatus(accountId: number, status: string): void {
    this.adminService.updateAccountStatus(accountId, status).subscribe({
      next: () => {
        this.successMessage = 'Account status updated successfully';
        this.loadAccounts();
      } ,
      error: (error) => {
        this.errorMessage = 'Error updating account status : ' + error.message;
      },
    });
  }
}
