import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { api } from '../api';

@Injectable({
  providedIn: 'root',
})
export class TokenRefreshService {
  private apiUrl = api.url

  constructor(private http: HttpClient) {}

  refreshToken(): Observable<any> {
    // Substitua '/refresh-token' pela rota da API que fornece o novo token
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, {}).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }
}
