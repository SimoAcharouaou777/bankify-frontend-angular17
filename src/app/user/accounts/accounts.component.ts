import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService, BankAccount, AccountCreationDTO} from "../../core/services/accounts/account.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {data} from "autoprefixer";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    SidebarComponent,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accounts: BankAccount[] = [];
  accountForm : FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  hasMore: boolean = true;

  constructor(
    private accountService : AccountService,
    private fb: FormBuilder
  ) {
    this.accountForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      identityNumber: ['', [Validators.required, Validators.maxLength(20)]],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchAccounts(this.currentPage, this.pageSize);
  }

  fetchAccounts(page: number, size: number): void {
    this.isLoading = true;
    this.accountService.getBankAccounts(page, size).subscribe(
      (data: BankAccount[]) => {
        this.accounts = data;
        this.hasMore = data.length == size;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load accounts. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if(this.accountForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    const accountData: AccountCreationDTO = {
      firstName: this.accountForm.value.firstName,
      lastName: this.accountForm.value.lastName,
      identityNumber: this.accountForm.value.identityNumber,
      dateOfBirth: this.accountForm.value.dateOfBirth
    };

    this.isLoading = true;
    this.accountService.createBankAccount(accountData).subscribe(
      (newAccount: BankAccount) => {
        this.accounts.push(newAccount);
        this.successMessage = 'Account created successfully.';
        this.errorMessage = '';
        this.accountForm.reset();
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error.error.message || 'Failed to create account. Please try again later.';
        this.successMessage = '';
        this.isLoading = false;
      }
    );
  }

  goToNextPage(): void {
    if (this.hasMore) {
      this.currentPage += 1;
      this.fetchAccounts(this.currentPage, this.pageSize);
    }
  }

  goToPreviousPage(): void {
    if(this.currentPage > 0) {
      this.currentPage -= 1;
      this.fetchAccounts(this.currentPage, this.pageSize);
    }
  }

  getAccountType(accountNumber: string): string {
    if(accountNumber.startsWith('1')) {
      return 'Checking Account';
    }else if (accountNumber.startsWith('9')){
      return 'Savings Account';
    } else {
      return 'Bank Account';
    }
  }

  maskAccountNumber(accountNumber: string): string {
    const visibleDigits = 4;
    const maskedSection = accountNumber.slice(0, -visibleDigits).replace(/\d/g, '*');
    const visibleSection = accountNumber.slice(-visibleDigits);
    return `${maskedSection}${visibleSection}`;
  }
}
