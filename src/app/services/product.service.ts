import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Item } from '../item-list/item.model';
import { CartService } from './cart.service'; // Certifique-se de que o caminho do import esteja correto
import { catchError, tap } from 'rxjs/operators';
import { api } from '../api';

export type Cart = {
  id: string;
  id_users: string | null;
  products: Array<Item>;
  subtotal: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = api.url;

  constructor(private http: HttpClient) {}

  // Cria um novo produto
  createProduct(product: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/products`, product).pipe(
      tap((response) => {
        localStorage.setItem('id', response.id);
        console.log('id do Produto: ', localStorage.getItem('id'));
      })
    );
  }

  // Recupera todos os produtos
  getProducts(): Observable<Item[]> {
    const response = this.http.get<Item[]>(`${this.apiUrl}/products`);
    return response;
  }

  // Recupera um produto pelo ID
  getProductById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  // Atualiza um produto
  updateProduct(id: string, product: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/products/${id}`, product);
  }

  // Exclui um produto
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error) => {
        alert('Erro ao excluir o produto');
        return throwError('Failed to delete product');
      })
    );
  }

  uploadImage(formData: FormData, id: string): Observable<any> {

    const formDataString = String(formData);
    const boundaryMatch = formDataString.match(/boundary=(.*)/);
    const boundary = boundaryMatch ? boundaryMatch[1] : undefined;

    const headers = {
      'Content-Type': 'multipart/form-data; boundary=' + boundary,
    };
    return this.http.patch(`${this.apiUrl}/products/import/${id}`, formData, {
      headers: headers,
      reportProgress: true,
      observe: 'events',
    });
  }
}
