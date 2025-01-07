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

  refreshToken(refreshToken: String): Observable<any> {
    return this.http.post<{ accessToken : String}>('/api/auth/refresh', {refreshToken}).pipe(
      map(response => response.accessToken),
      catchError((error) => {
        this.router.navigate(['/login']);
        return throwError(error);
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

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}
