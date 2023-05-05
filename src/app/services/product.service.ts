import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item-list/item.model';
import { CartService } from '../cart.service'; // Certifique-se de que o caminho do import esteja correto
import { tap } from 'rxjs/operators';

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
  private apiUrl = 'http://52.55.161.218'; // Substitua pelo endereço do seu servidor

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
    console.log('aaa')
    const response = this.http.get<Item[]>(`${this.apiUrl}/products`);
    console.log(response);
    return response;
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
  addProductToCart(productId: string, quantity: number){
    this.http.post<Cart>(
        `${this.apiUrl}/shoppingCart/add-product/${productId}/${quantity}/`,
        {}
      )
      .subscribe((response) => {
        console.log(response);
        // localStorage.setItem('idCart', response);
      });


  }

  addProductToCartWithID( quantity: number, idCart: string){
    this.http.post<void>(`${this.apiUrl}/shoppingCart/add-product/397c08c9-08db-4f23-8b5a-7c23d58c519b/${quantity}/${idCart}`, {}).subscribe(
      (response) => {
        console.log(response)
      });
  }
}


// 70df3aad-6787-4844-9777-cce40bc1fdcc
// e6fded3d-41e7-40db-b865-5c84fc14da8d
