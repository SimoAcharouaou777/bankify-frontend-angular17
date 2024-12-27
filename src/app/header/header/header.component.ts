import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
    isAuthenticated: boolean = false;
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
      this.authService.isAuthenticated$.subscribe(status => {
        this.isAuthenticated = status;
      });
    }

    logout(): void {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Logout failed', error);
          this.router.navigate(['/login']);
        }
      });
    }
}
