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
