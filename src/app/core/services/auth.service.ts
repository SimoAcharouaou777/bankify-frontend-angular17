import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router= inject(Router);
  private apiUrl = '/api/auth'
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('accessToken');
    this.isAuthenticatedSubject.next(!!token);
    this.ensureTokenValidity();
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
        return throwError(error);
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

  refreshToken(refreshToken: string): Observable<string> {
    return this.http.post<{ accessToken : string}>('/api/auth/refresh', {refreshToken}).pipe(
      map((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        return response.accessToken;
      }),
      catchError((error) => {
        console.error('Token refresh failed', error);
        this.logout().subscribe();
        this.router.navigate(['/login']);
        return throwError(error);
      })
    );
  }

  logout(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if(!refreshToken) {
      console.error('No refresh token available');
      return throwError(() => new Error('No refresh token available'));
    }
     return this.http.post(`${this.apiUrl}/logout`, {refreshToken}).pipe(
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
         return throwError(error);
       })
     );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  }

   ensureTokenValidity(): void {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();

    if(token && this.isTokenExpired(token) && refreshToken) {
      this.refreshToken(refreshToken).subscribe({
        next: () => console.log('Token refreshed successfully'),
        error: (error) => console.log('Failed to refresh token', error),
      });
    }
   }
}
