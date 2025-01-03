import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

export interface BankAccount {
  id: number;
  accountType: string;
  accountNumber: string;
  balance: number;
  status: string;
}

export interface AccountCreationDTO {
  firstName: string;
  lastName: string;
  identityNumber: string;
  dateOfBirth: string;
}

export interface TransactionRequest {
  accountId: number;
  amount: number;
}

export interface TransferRequest {
  fromAccount: number;
  toAccount: number;
  amount: number;
  transactionType: string;
  frequency?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseApiUrl = 'api/user/accounts';

  constructor(private http: HttpClient) { }

  getBankAccounts(page: number = 0, size: number = 10): Observable<BankAccount[]> {
    const url = `${this.baseApiUrl}?page=${page}&size=${size}`;
    return this.http.get<BankAccount[]>(url, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  createBankAccount(accountData: AccountCreationDTO): Observable<BankAccount> {
    return this.http.post<BankAccount>(this.baseApiUrl, accountData, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  getBankAccountById(id: number): Observable<BankAccount> {
    const url = `${this.baseApiUrl}/${id}`;
    return this.http.get<BankAccount>(url, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  depositMoney(transactionRequest: TransactionRequest): Observable<any> {
    const url = '/api/user/deposit';
    return this.http.post(url, transactionRequest, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  withdrawMoney(transactionRequest: TransactionRequest): Observable<any> {
    const url = 'api/user/withdraw';
    return this.http.post(url, transactionRequest, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  transferFunds(transferRequest: TransferRequest): Observable<any> {
    const url = 'api/user/transfer';
    return this.http.post(url, transferRequest, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
