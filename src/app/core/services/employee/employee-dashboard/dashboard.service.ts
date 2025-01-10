import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'api/employee'
  constructor( private http: HttpClient) { }

  getDashboardDataSummary(): Observable<any> {
    return this.http.get(`${this.url}/dashboard-data`);
  }

  approveTransaction(transactionId: number): Observable<any> {
    return this.http.post(`${this.url}/transactions/${transactionId}/approve`, {});
  }

  rejectTransaction(transactionId: number): Observable<any> {
    return this.http.post(`${this.url}/transactions/${transactionId}/reject`, {});
  }

  approveLoan(loanId: number): Observable<any> {
    return this.http.post(`${this.url}/loans/${loanId}/approve`, {});
  }

  rejectLoan(loanId: number): Observable<any> {
    return this.http.post(`${this.url}/loans/${loanId}/reject`, {});
  }

  approveInvoice(invoiceId: number): Observable<any> {
    return this.http.post(`${this.url}/invoices/${invoiceId}/approve`, {});
  }

  rejectInvoice(invoiceId: number): Observable<any> {
    return this.http.post(`${this.url}/invoices/${invoiceId}/reject`, {});
  }
}
