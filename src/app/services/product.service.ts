import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Item } from '../item-list/item.model';
import { api } from '../api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = api.url;

  constructor(private http: HttpClient) {}

  createProduct(product: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/products`, product).pipe(
      tap((response) => {
        localStorage.setItem('id', response.id);
        console.log('id do Produto: ', localStorage.getItem('id'));
      })
    );
  }

  getProducts(): Observable<Item[]> {
    const response = this.http.get<Item[]>(`${this.apiUrl}/products`);
    return response;
  }

  getProductById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: string, product: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error) => {
        alert('Erro ao excluir o produto');
        return throwError('Failed to delete product');
      })
    );
  }

  uploadFile(productId: string, formData: FormData): Observable<any> {
    // Atualizando a URL para a rota correta e incluindo o ID do produto
    return this.http.patch<any>(`${this.apiUrl}/products/import/${productId}`, formData);
  }
}
