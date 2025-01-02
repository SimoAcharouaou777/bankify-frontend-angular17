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

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'api/user/accounts';

  constructor(private http: HttpClient) { }

  getBankAccounts(page: number = 0, size: number = 10): Observable<BankAccount[]> {
    const url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<BankAccount[]>(url, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  createBankAccount(accountData: AccountCreationDTO): Observable<BankAccount> {
    return this.http.post<BankAccount>(this.apiUrl, accountData, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  getBankAccountById(id: number): Observable<BankAccount> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<BankAccount>(url, this.getAuthHeaders())
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
