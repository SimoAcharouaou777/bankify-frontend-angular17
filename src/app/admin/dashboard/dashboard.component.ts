import { Component } from '@angular/core';
import {HeaderComponent} from "../../layout/header/header.component";
import {SidebarComponent} from "../../layout/sidebar/sidebar.component";
import {FooterComponent} from "../../layout/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
