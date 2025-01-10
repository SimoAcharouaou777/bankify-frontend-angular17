import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CurrencyPipe, NgClass, NgForOf, TitleCasePipe} from "@angular/common";
import {InvoicesService} from "../../core/services/employee/employee-invoices/invoices.service";

@Component({
  selector: 'app-employee-invoices',
  standalone: true,
  imports: [
    SidebarComponent,
    NgForOf,
    CurrencyPipe,
    TitleCasePipe,
    NgClass
  ],
  templateUrl: './employee-invoices.component.html',
})
export class EmployeeInvoicesComponent implements OnInit{
  invoices: any[] = [];
  errorMessage: string = '';

  constructor( private invoiceService: InvoicesService) {}
  ngOnInit(): void { this.getInvoices(); }

  getInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
      },
      error: (error) => {
        this.errorMessage = 'Error loading invoices: ' + error;
      }
    });
  }

  approveInvoice(invoiceId: number): void {
    this.invoiceService.approveInvoice(invoiceId).subscribe({
      next: () => {
        console.log(`Invoice with ID: ${invoiceId} approved successfully`);
        this.getInvoices();
      },
      error: (error) => {
        console.error(`Error approving invoice with ID: ${invoiceId}`, error);
      }
    });
  }

  rejectInvoice(invoiceId: number): void {
    this.invoiceService.rejectInvoice(invoiceId).subscribe({
      next: () => {
        console.log(`Invoice with ID: ${invoiceId} rejected successfully`);
        this.getInvoices();
      },
      error: (error) => {
        console.error(`Error rejecting invoice with ID: ${invoiceId}`, error);
      }
    });
  }

}
