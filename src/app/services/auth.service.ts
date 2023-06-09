import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { api } from '../api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = api.url;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sessions`, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(user: {
    name: string;
    email: string;
    password: string;
    address: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
