import {Component, OnInit} from '@angular/core';
import {LoansService} from "../../core/services/employee/employee-loans/loans.service";
import {CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-employee-loans',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgClass,
    CurrencyPipe,
    SidebarComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './employee-loans.component.html',
  styleUrl: './employee-loans.component.css'
})
export class EmployeeLoansComponent implements OnInit{
  loans: any[] = [];
  errorMessage: string = '';

  constructor(private loansService: LoansService) { }

  ngOnInit(): void { this.getLoans(); }

  getLoans(): void {
    this.loansService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
      },
      error: (error) => {
        this.errorMessage = 'Error loading loans: ' + error;
      }
    });
  }

  approveLoan(loanId: number): void {
    this.loansService.approveLoan(loanId).subscribe({
      next: () => {
        console.log(`Loan with ID: ${loanId} approved successfully`);
        this.getLoans();
      },
      error: (error) => {
        console.error(`Error approving loan: ${error.message}`);
      }
    });
  }

  rejectLoan(loanId: number): void {
    this.loansService.rejectLoan(loanId).subscribe({
      next: () => {
        console.log(`Loan with ID: ${loanId} rejected successfully`);
        this.getLoans();
      },
      error: (error) => {
        console.error(`Error rejecting loan: ${error.message}`);
      }
    });
  }

}
