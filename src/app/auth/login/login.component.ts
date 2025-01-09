import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { AuthService} from "../../core/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    login() {
      if(!this.username || !this.password){
        this.errorMessage = 'All fields are required';
        this.successMessage = '';
        return;
      }

      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          if(response && response.accessToken){
            this.successMessage = 'Login successful';
            this.errorMessage = '';

            if(response.role === 'ADMIN'){
              this.router.navigate(['/admin/dashboard']);
            }else if (response.role === 'EMPLOYEE'){
              this.router.navigate(['/employee/dashboard']);
            } else{
              this.router.navigate(['/user/dashboard']);
            }
          } else {
            this.errorMessage = 'Login failed. Please check your credentials';
            this.successMessage = '';
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'login failed. Pleas check your credentials';
          this.successMessage = '';
          console.error('Login failed',error);
        }
      });
    }
}
