import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
    imports: [
        SidebarComponent
    ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {

}
