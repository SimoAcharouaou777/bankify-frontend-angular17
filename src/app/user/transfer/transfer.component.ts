import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-transfer',
  standalone: true,
    imports: [
        SidebarComponent
    ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {

}
