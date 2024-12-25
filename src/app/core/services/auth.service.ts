import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = '/api/auth'

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = { username, password};
    return this.http.post(`${this.apiUrl}/login`, body, { headers});
  }

  register(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const body = { username, password};
    return this.http.post(`${this.apiUrl}/register`, body, { headers});
  }
}
