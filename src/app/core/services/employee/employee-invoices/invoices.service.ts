import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<any> {
    return this.http.get(`api/employee/invoices`);
  }

  approveInvoice(invoiceId: number): Observable<any> {
    return this.http.post(`api/employee/invoices/${invoiceId}/approve`, {});
  }

  rejectInvoice(invoiceId: number): Observable<any> {
    return this.http.post(`api/employee/invoices/${invoiceId}/reject`, {});
  }
}
