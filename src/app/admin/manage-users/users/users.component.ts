import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../core/services/admin/users/user.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    SidebarComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void { this.loadUsers(); }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        this.errorMessage = 'Error loading users.';
        console.error(error);
      },
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.log(`User with ID: ${userId} deleted successfully.`);
        this.loadUsers();
      },
      error: (error) => {
        console.error(`Error deleting user with ID: ${userId}`, error);
        this.errorMessage = `Error deleting user.`;
      },
    });
  }
}
