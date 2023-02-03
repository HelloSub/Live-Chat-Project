import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // getAllCountry():observable<any> {
  //   return this.http.get<any[]>(`http://localhost:4000/api/get-users`);
  // }
  getAllUsers(): Observable<any> {
    return this.http.get<any[]>(`http://localhost:4000/auth/user`);
  }
}
