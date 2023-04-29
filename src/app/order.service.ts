import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://34.227.223.49';

//Injetando serviço HttpClient no contrutor
constructor(private http: HttpClient) {}
//Método que realiza requisição HTTP
createOrder(orderData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
    
  });

  console.log('Token enviado:', headers.get('Authorization'));

  return this.http.post<any>(`${this.apiUrl}/orders`, orderData, { headers });

  }
}
