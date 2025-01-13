import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getPendingTransactions(): Observable<any[]> {
    return this.http.get<any[]>('api/employee/transactions');
  }

  approveTransaction(transactionId: number): Observable<any> {
    return this.http.post(`api/employee/transactions/${transactionId}/approve`, {});
  }

  rejectTransaction(transactionId: number): Observable<any> {
    return this.http.post(`api/employee/transactions/${transactionId}/reject`, {});
  }

}
