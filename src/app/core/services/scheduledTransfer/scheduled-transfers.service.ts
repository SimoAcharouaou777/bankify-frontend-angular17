import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";


export interface ScheduledTransferResponse {
  id: number;
  fromAccount: number;
  fromAccountNumber: string;
  toAccountId : number;
  toAccountNumber: string;
  amount: number;
  frequency: string;
  nextExecutionDate: Date;
  endDate?: Date;
}
@Injectable({
  providedIn: 'root'
})
export class ScheduledTransfersService {

  constructor(private http: HttpClient) { }

  getScheduledTransfersByAccount(accountId: number, page: number = 0, size: number = 10): Observable<ScheduledTransferResponse[]> {
    const url = `api/user/accounts/${accountId}/scheduled-transfers?page=${page}&size=${size}`;
    return this.http.get<ScheduledTransferResponse[]>(url, this.getAuthHeaders())
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
