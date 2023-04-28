import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './item-list/cart-item.model';
import { Order } from './order';

@Injectable({
  providedIn: 'root',
})
export class TempStorageService {
  private orderData: Order | null = null;
  public orderData$: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>(null);

  constructor() {}

  setOrderData(cartItems: CartItem[], formData: any): void {
    this.orderData = { ...formData, cartItems: cartItems, totalPrice: this.calculateTotalPrice(cartItems) };
    this.orderData$.next(this.orderData);
  }

  getOrderData(): Order | null {
    return this.orderData;
  }

  clearOrderData(): void {
    this.orderData = null;
    this.orderData$.next(null);
  }

  private calculateTotalPrice(cartItems: CartItem[]): number {
    return cartItems.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
  }
  getCartItemsFromStorage(): CartItem[] {
    // Tente obter os itens do carrinho do armazenamento local
    const cartItemsJson = localStorage.getItem('cartItems');
  
    // Se houver dados do carrinho no armazenamento local, retorne-os
    if (cartItemsJson) {
      return JSON.parse(cartItemsJson);
    }
  
    // Caso contrário, retorne um array vazio
    return [];
  }
}
