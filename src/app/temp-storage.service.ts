import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './item-list/cart-item.model';
import { Order } from './order';

@Injectable({
  providedIn: 'root',
})
export class TempStorageService {
  private orderData: Order | null = null;
  private orderDataSubject = new BehaviorSubject<Order | null>(null);
  orderData$ = this.orderDataSubject.asObservable();

  constructor() {}

  setOrderData(cartItems: CartItem[], formData: any): void {
    this.orderData = {
      name: formData.name,
      whatsapp: formData.whatsapp,
      shippingOption: formData.shippingOption,
      street: formData.street,
      neighborhood: formData.neighborhood,
      number: formData.number,
      zipcode: formData.zipcode,
      reference: formData.reference,
      cartItems: cartItems,
      totalPrice: this.calculateTotalPrice(cartItems),
    };
    this.orderDataSubject.next(this.orderData);
  }

  getOrderData(): Order | null {
    return this.orderData;
  }

  clearOrderData(): void {
    this.orderData = null;
    this.orderDataSubject.next(null);
  }

  private calculateTotalPrice(cartItems: CartItem[]): number {
    return cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  }
}
