import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

export interface Invoice {
  id: number;
  invoiceNumber: string;
  description: string;
  amount: number;
  status: 'PENDING' | 'PAID';
  dueDate: string;
  userId : number;
}

export interface InvoiceRequest {
  invoiceNumber: string;
  description: string;
  amount: number;
  dueDate: string;
}
export interface InvoiceResponse extends Invoice{}
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  createInvoice(invoiceRequest: InvoiceRequest): Observable<InvoiceResponse> {
    const url = `api/user/invoices`;
    return this.http.post<InvoiceResponse>(url, invoiceRequest)
      .pipe(catchError(this.handleError));
  }

  getInvoices(): Observable<InvoiceResponse[]> {
    const url = `api/user/invoices`;
    return this.http.get<InvoiceResponse[]>(url)
      .pipe(catchError(this.handleError));
  }

  updateInvoiceStatus(id: number, status: string): Observable<InvoiceResponse> {
    const url = `api/user/invoices/${id}/status?status=${status}`;
    return this.http.put<InvoiceResponse>(url, {})
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred";
    if(error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if(error.error && error.error.message){
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
