import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../core/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    errorMessage: string = '';
    successMessage: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    register() {
      this.errorMessage = '';
      this.successMessage = '';

      if(this.password !== this.confirmPassword){
        this.errorMessage = 'Passwords do not match';
        return;
      }
      if(!this.username || !this.password || !this.confirmPassword){
        this.errorMessage = 'All fields are required';
        return;
      }
      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Registration failed';
          console.error('Registration failed' + this.errorMessage);
        }
      });
    }
}
