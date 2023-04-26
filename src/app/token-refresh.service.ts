import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenRefreshService {
  private apiUrl = 'http://34.227.223.49'; // Atualize para o domínio da sua API

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