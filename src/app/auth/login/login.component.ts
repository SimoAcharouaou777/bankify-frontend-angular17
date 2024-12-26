import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { AuthService} from "../../core/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    HttpClientModule
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
          localStorage.setItem('role', response.role);

          if(response.role === 'ADMIN'){
            this.router.navigate(['/admin/dashboard']);
          }else if (response.role === 'EMPLOYEE'){
            this.router.navigate(['/employee/dashboard']);
          }else{
            this.router.navigate(['/user/dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed',error);
        }
      });
    }
}
