import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardSummary(): Observable<any> {
    const url = `api/user/dashboard-summary`;
    return this.http.get(url);
  }

}
