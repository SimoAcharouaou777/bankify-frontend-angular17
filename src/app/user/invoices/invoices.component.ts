import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InvoiceRequest, InvoiceResponse, InvoiceService} from "../../core/services/invoices/invoice.service";
import {data} from "autoprefixer";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './invoices.component.html',
})
export class InvoicesComponent implements OnInit{

  invoices: InvoiceResponse[] = [];
  newInvoice: InvoiceRequest = {
    invoiceNumber: '',
    description: '',
    amount: 0,
    dueDate: '',
  };
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void { this.fetchInvoices(); }

  fetchInvoices(): void {
    this.isLoading = true;
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
        this.isLoading = false;
        this.clearMessages();
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        this.clearMessages();
      }
    });
  }

  submitInvoice(): void {
    if(this.newInvoice.invoiceNumber && this.newInvoice.description && this.newInvoice.amount > 0 && this.newInvoice.dueDate) {
      this.isLoading = true;
      this.invoiceService.createInvoice(this.newInvoice).subscribe({
        next: (createdInvoice) => {
          this.invoices.push(createdInvoice);
          this.successMessage = 'Invoice created successfully';
          this.newInvoice = {
            invoiceNumber: '',
            description: '',
            amount: 0,
            dueDate: '',
          };
          this.isLoading = false;
          this.clearMessages();
        },
        error: (error) => {
          this.errorMessage = error;
          this.isLoading = false;
          this.clearMessages();
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly';
      this.clearMessages();
    }
  }

  updateStatus(invoiceId: number , status: string): void {
    this.isLoading = true;
    this.invoiceService.updateInvoiceStatus(invoiceId, status).subscribe({
      next: (updatedInvoice) => {
        const index = this.invoices.findIndex(inv => inv.id === invoiceId);
        if(index !== -1) {
          this.invoices[index].status = updatedInvoice.status;
        }
        this.successMessage = 'Invoice status updated successfully';
        this.isLoading = false;
        this.clearMessages();
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false
        this.clearMessages();
      }
    });
  }

  clearMessages(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 5000);
  }

}
