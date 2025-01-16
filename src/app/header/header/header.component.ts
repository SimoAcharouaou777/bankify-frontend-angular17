import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

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
    user: any = {};
    profile: any = {};
    isAuthenticated: boolean = false;
    isDropdownOpen: boolean = false;
    constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

    ngOnInit(): void {
      this.authService.isAuthenticated$.subscribe(status => {
        this.isAuthenticated = status;
        this.getUserProfile();
      });
    }

    toggleDropdown(): void {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

  getUserProfile(): void {
    this.http.get('/api/user/profile').subscribe({
      next: (data) => {
        this.user = data;
        this.profile = {...data};
      },
      error: (error) => {
        console.error('Error loading user profile', error);
      }
    })

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
