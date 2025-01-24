import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {data} from "autoprefixer";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SidebarComponent,
    FormsModule,
    DatePipe,
    NgIf
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit{
  user: any = {};
  isEditing: boolean = false;
  profile: any = {};
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    const token = localStorage.getItem('accessToken');
    if(!token) {
      console.error('Access token not found');
      return
    }
    this.http.get('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}`},
    }).subscribe({
      next: (data) => {
        this.user = data;
        this.profile = {...data};
      },
      error: (error) => {
        console.error('Error loading user profile', error);
      }
    })

  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }
  onSubmit(): void {
    const token = localStorage.getItem('accessToken');
    if(!token) {
      console.error('Access token not found');
      return;
    }

    const profileData = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      dateOfBirth: this.profile.dateOfBirth,
      age: this.profile.age,
      identityNumber: this.profile.identityNumber
    };
    this.http.put('/api/user/profile', profileData, {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe({
      next: (data) => {
        this.user = data;
        this.isEditing = false;
      },
      error: (error) => {
        console.error('Error updating user profile', error);
      }
    });
  }
}
