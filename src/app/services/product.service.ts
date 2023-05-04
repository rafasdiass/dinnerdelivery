import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item-list/item.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://18.234.79.16'; // Substitua pelo endereço do seu servidor

  constructor(private http: HttpClient) {}

  // Cria um novo produto
  createProduct(product: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/products`, product).pipe(
      tap((response) => {
        localStorage.setItem('id', response.id);
        console.log('id do Produto: ', localStorage.getItem('id'))
      })
    );
  }

  // Recupera todos os produtos
  getProducts(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // Recupera um produto pelo ID
  getProductById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  // Atualiza um produto
  updateProduct(id: string, product: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, product);
  }

  // Exclui um produto
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Adiciona um produto ao carrinho
  addProductToCart( quantity: number){
    // Substitua a URL abaixo pela URL da API do seu servidor
    this.http.post<Item>(`${this.apiUrl}/shoppingCart/add-product/e6fded3d-41e7-40db-b865-5c84fc14da8d/${quantity}/`, {}).subscribe(
      ((response) => {
        localStorage.setItem('idCart', response.id);
      })
    );
  }
  addProductToCartWithID( quantity: number, idCart: string){
    // Substitua a URL abaixo pela URL da API do seu servidor
    
    this.http.post<Item>(`${this.apiUrl}/shoppingCart/add-product/397c08c9-08db-4f23-8b5a-7c23d58c519b/${quantity}/${idCart}`, {}).subscribe(
      ((response) => {
        console.log(response)
      })
    );
  }

}

