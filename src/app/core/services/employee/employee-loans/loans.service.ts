import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private http: HttpClient) { }

  getLoans(): Observable<any[]> {
    return this.http.get<any[]>(`api/employee/loans`);
  }

  approveLoan(loanId: number): Observable<any> {
    return this.http.post(`api/employee/loans/${loanId}/approve`, {});
  }

  rejectLoan(loanId: number): Observable<any> {
    return this.http.post(`api/employee/loans/${loanId}/reject`, {});
  }
}
