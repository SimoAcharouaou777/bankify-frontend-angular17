import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";


export interface TransactionResponse {
    amount: number;
    date: string;
    type: string;
    status: string;
    otherPartyUsername: string;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: 'Pending' | 'Completed'| 'Rejected';
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getUserTransactions(page: number = 0, size: number = 10): Observable<TransactionResponse[]> {
    const url = `api/user/transactions?page=${page}&size=${size}`;
    return this.http.get<TransactionResponse[]>(url, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getUserTransactionsByAccount(accountId: number, page: number = 0, size: number = 10): Observable<TransactionResponse[]> {
    const url = `api/user/accounts/${accountId}/transactions?page=${page}&size=${size}`;
    return this.http.get<TransactionResponse[]>(url, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`api/user/transactions`, this.getAuthHeaders())
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
