import { Component } from '@angular/core';
import {SidebarComponent} from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
