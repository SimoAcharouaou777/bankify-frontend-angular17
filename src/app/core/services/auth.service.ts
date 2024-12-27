import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('accessToken');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = { username, password};
    return this.http.post(`${this.apiUrl}/login`, body, { headers}).pipe(
      tap((response: any) => {
        if(response.accessToken){
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('role', response.role);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = { username, password};
    return this.http.post(`${this.apiUrl}/register`, body, { headers, responseType: 'json'}).pipe(
      catchError(error => {
        console.error('Registration failed', error);
        return of(null);
      })
    );
  }

  refreshToken(): Observable<any> {
     const refreshToken = localStorage.getItem('refreshToken');
     if(!refreshToken) {
       this.isAuthenticatedSubject.next(false);
       return of(null);
     }
     return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
       tap((response: any) => {
         if(response.accessToken) {
           localStorage.setItem('accessToken', response.accessToken);
           this.isAuthenticatedSubject.next(true);
         }
       }),
       catchError(error => {
          console.error('Token refresh failed', error);
          this.isAuthenticatedSubject.next(false);
          return of(null);
       })
     );
  }

  logout(): Observable<any> {
     return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
       tap(() => {
         localStorage.removeItem('accessToken');
         localStorage.removeItem('refreshToken');
         localStorage.removeItem('role');
         this.isAuthenticatedSubject.next(false);
       }),
       catchError(error => {
         console.error('Logout failed', error);
         localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('role');
          this.isAuthenticatedSubject.next(false);
         return of(null);
       })
     );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
