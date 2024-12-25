import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    HttpClientModule
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
        console.error(this.errorMessage);
        return;
      }
      if(!this.username || !this.password || !this.confirmPassword){
        this.errorMessage = 'All fields are required';
        console.error(this.errorMessage);
        return;
      }
      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful';
          alert(this.successMessage);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Registration failed';
          console.error('Registration failed',error);
          alert('Registration failed' + this.errorMessage);
        }
      });
    }
}
