import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item-list/item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://3.83.176.3/products'; // Substitua pelo endereço do seu servidor

  constructor(private http: HttpClient) {}

  // Cria um novo produto
  createProduct(product: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, product);
  }

  // Recupera todos os produtos
  getProducts(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // Recupera um produto pelo ID
  getProductById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  // Atualiza um produto
  updateProduct(id: number, product: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, product);
  }

  // Exclui um produto
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
