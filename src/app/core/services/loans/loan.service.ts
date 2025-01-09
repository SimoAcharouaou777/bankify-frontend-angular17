import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

export interface LoanRequest {
  amount: number;
  termInMonths: number;
  monthlyIncome: number;
  purpose: string;
}

export interface LoanResponse {
  id: number;
  amount: number;
  termInMonths: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  applicationDate: string;
}

export interface ErrorResponse {
  message: string;
  timestamp: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor( private http: HttpClient) { }

  applyForLoan(loanRequest: LoanRequest): Observable<LoanResponse> {
    const url = `api/user/loans`;
    return this.http.post<LoanResponse>(url, loanRequest, this.getAuthHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  getLoans(): Observable<LoanResponse[]> {
    const url = `api/user/loans`;
    return this.http.get<LoanResponse[]>(url, this.getAuthHeaders())
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

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(error);
  }
}
