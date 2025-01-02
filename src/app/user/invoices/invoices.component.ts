import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {

}
