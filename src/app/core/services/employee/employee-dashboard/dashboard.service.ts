import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor( private http: HttpClient) { }

  getDashboardDataSummary(): Observable<any> {
    return this.http.get(`api/employee/dashboard-data`);
  }

  getRecentTransactions(): Observable<any> {
    return this.http.get(`api/employee/recent-transactions`);
  }

  approveTransaction(transactionId: number): Observable<any> {
    return this.http.post(`api/employee/transactions/${transactionId}/approve`, {});
  }

  rejectTransaction(transactionId: number): Observable<any> {
    return this.http.post(`api/employee/transactions/${transactionId}/reject`, {});
  }

  approveLoan(loanId: number): Observable<any> {
    return this.http.post(`api/employee/loans/${loanId}/approve`, {});
  }

  rejectLoan(loanId: number): Observable<any> {
    return this.http.post(`api/employee/loans/${loanId}/reject`, {});
  }

  approveInvoice(invoiceId: number): Observable<any> {
    return this.http.post(`api/employee/invoices/${invoiceId}/approve`, {});
  }

  rejectInvoice(invoiceId: number): Observable<any> {
    return this.http.post(`api/employee/invoices/${invoiceId}/reject`, {});
  }

}
