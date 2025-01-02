import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-loans',
  standalone: true,
    imports: [
        SidebarComponent
    ],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css'
})
export class LoansComponent {

}
