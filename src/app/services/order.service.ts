import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../api';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = api.url;

  //Injetando serviço HttpClient no contrutor
  constructor(private http: HttpClient) {}
  //Método que realiza requisição HTTP
  createOrder(orderData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    console.log('Token enviado:', headers.get('Authorization'));

    return this.http.post<any>(`${this.apiUrl}/orders`, orderData, { headers });
  }
}
