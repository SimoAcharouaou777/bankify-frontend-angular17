import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { AuthService} from "../../core/services/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          console.error('Login failed',error);
        }
      });
    }
}
