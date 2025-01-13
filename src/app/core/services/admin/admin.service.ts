import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`api/admin/users`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`api/admin/users`, userData);
  }

  updateUser(userId: number, userData: any):Observable<any> {
    return this.http.put(`api/admin/users/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`api/admin/users/${userId}`);
  }

  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`api/admin/accounts`);
  }

  updateAccountStatus(accountId: number, status: string): Observable<any> {
    return this.http.put(`api/admin/accounts/${accountId}/status`, null, {params: {status},
    });
  }

}
