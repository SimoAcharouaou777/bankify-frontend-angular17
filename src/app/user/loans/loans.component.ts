import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoanRequest, LoanResponse, LoanService} from "../../core/services/loans/loan.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-loans',
  standalone: true,
    imports: [
        SidebarComponent,
      CommonModule,
      FormsModule,
      HttpClientModule
    ],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css'
})
export class LoansComponent implements OnInit{
  loans: LoanResponse[] = [];
  newLoan: LoanRequest = {
    amount: 0,
    termInMonths: 0,
    monthlyIncome: 0,
    purpose: '',
  };
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private loanService: LoanService) { }

  ngOnInit(): void { this.fetchLoans(); }

  fetchLoans(): void {
    this.isLoading = true;
    this.loanService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.isLoading = false;
        this.clearMessages();
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        this.clearMessages();
      }
    });
  }

  submitLoan(): void {
    if(this.isLoanFormValid()) {
      this.isLoading = true;
      this.loanService.applyForLoan(this.newLoan).subscribe({
        next: (createdLoan) => {
          this.loans.push(createdLoan);
          this.successMessage = 'Loan application submitted successfully';
          this.resetForm();
          this.isLoading = false;
          this.clearMessages();
        },
        error: (error) => {
          this.errorMessage = error;
          this.isLoading = false;
          this.clearMessages();
        }
      });
    } else {
      this.errorMessage = 'Please fill all fields';
      this.clearMessages();
    }
  }

  isLoanFormValid(): boolean {
    return (
      this.newLoan.amount > 0 &&
        this.newLoan.termInMonths > 0 &&
        this.newLoan.monthlyIncome > 0 &&
        this.newLoan.purpose.trim() !== ''
    );
  }

  resetForm(): void {
    this.newLoan = {
      amount: 0,
      termInMonths: 0,
      monthlyIncome: 0,
      purpose: '',
    };
  }

  clearMessages(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 5000);
  }
}
