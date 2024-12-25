import { Component } from '@angular/core';
import {HeaderComponent} from "../../layout/header/header.component";
import {SidebarComponent} from "../../layout/sidebar/sidebar.component";
import { FooterComponent} from "../../layout/footer/footer.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
