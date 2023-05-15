import { Injectable, OnInit } from '@angular/core';
import { Item } from '../item-list/item.model';
import { CartItem } from '../item-list/cart-item.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { api } from '../api';
import { Cart } from '../item-list/cart.model';
import { map } from 'rxjs/operators';

type CartType = {
  id: string;
  id_users: string | null;
  products: Array<Item>;
  subtotal: number;
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart | null = null;
  public totalItems: number = 0;
  cartItems: CartItem[] = [];
  private deliveryOption: string = 'pickup';
  cartChanged = new Subject<number>();

  constructor(private http: HttpClient) {
    this.getCart().subscribe((cart) => {
      // inscreve-se no Observable
      this.cart = cart; // atualiza a variável com o valor do Observable
    });
  }

  addItem(item: Item, quantity: number): void {
    let found = false;
    for (let cartItem of this.cartItems) {
      if (cartItem.item.id === item.id) {
        found = true;
        cartItem.quantity += quantity;
        break;
      }
    }
    if (!found) {
      let newCartItem = new CartItem(item, quantity);
      this.cartItems.push(newCartItem);
    }
    this.cartChanged.next(this.getTotalItems());
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartChanged.next(0);
  }

  async increaseItemQuantity(productId: string) {
    await this.addProductToCart(productId, 1);

    this.cart?.products.map((product) => {
      if (product.id === productId) {
        product.quantity++;
      }
    });

  }

  decreaseItemQuantity(productId: string): void {
    const idCart = localStorage.getItem('idCart');
    let ultimoProduto = false;
    let quantity = 0;

    const indexProduct = this.cart?.products.findIndex(
      (product) => product.id === productId
    );

    this.cart?.products.map((product) => {
      if (product.id === productId) {
        if (product.quantity > 1) {
          product.quantity--;
          quantity = product.quantity;
        } else {
          product.quantity--;
          quantity = product.quantity;
          ultimoProduto = true;
        }
      }
    });

    if (ultimoProduto) {
      this.cart?.products.splice(indexProduct as number, 1);
    }

    if (this.cart) {
      this.cart.subtotal = this.atualizaSubTotal();
    }

    this.totalItems = this.cart?.products.length as number;

    if (this.cart?.subtotal === 0) {
      localStorage.removeItem('idCart');
    }

    this.http
      .put<void>(
        `${api.url}/shoppingCarts/${productId}/${quantity}/${idCart}`,
        {}
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  atualizaSubTotal(): number {
    let soma: number = 0;
    this.cart?.products.map((product) => {
      soma += product.unit_price * product.quantity;
    });
    return soma;
  }

  setDeliveryOption(option: string): void {
    this.deliveryOption = option;
  }

  getShippingOption(): string {
    return this.deliveryOption;
  }

  getDeliveryFee(): number {
    return this.deliveryOption === 'delivery' ? 10 : 0;
  }

  getTotalItems(): number {
    console.log(this.totalItems);
    return this.totalItems;
  }

  setTotalItems(items: number): void {
    this.totalItems = items;
  }

  getCart(): Observable<Cart> {
    return this.http
      .get<Cart>(`${api.url}/shoppingCarts/${localStorage.getItem('idCart')}`)
      .pipe(
        map((response) => {
          const cart = response as Cart;
          console.log(cart);
          this.totalItems = cart.products.length;
          return cart;
        })
      );
  }

  addProductToCart(productId: string, quantity: number) {
    const idCart = localStorage.getItem('idCart');
    if (idCart) {
      console.log('passou aqui');
      this.addProductToCartWithID(productId, quantity, idCart);
    } else {
      this.http
        .post<any>(
          `${api.url}/shoppingCarts/add-product/${productId}/${quantity}/`,
          {}
        )
        .subscribe((response) => {
          console.log(response);
          localStorage.setItem('idCart', response.shoppingCart.id);
          this.getCart().subscribe((cart) => {
            this.cart = cart;
          });
          console.log(localStorage.getItem('idCart'));
        });
    }
  }

  addProductToCartWithID(productId: string, quantity: number, idCart: string) {
    this.http
      .post<void>(
        `${api.url}/shoppingCarts/add-product/${productId}/${quantity}/${idCart}`,
        {}
      )
      .subscribe((response) => {
        console.log(response);
        this.getCart().subscribe((cart) => {
          this.cart = cart;
        });
      });
  }
  getTotalCost(): number {
    let deliveryFee = this.getDeliveryFee();
    let subtotal = this.cart ? this.cart.subtotal : 0;
    return subtotal + deliveryFee;
  }
}
