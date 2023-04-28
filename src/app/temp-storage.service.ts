import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './item-list/cart-item.model';
import { Order } from './order';

@Injectable({
  providedIn: 'root',
})
export class TempStorageService {
  private orderDataSubject = new BehaviorSubject<Order | null>(null);
  orderData$ = this.orderDataSubject.asObservable();

  constructor() {}

  setOrderData(cartItems: CartItem[], shippingData: any): void {
    const order: Order = {
      cartItems,
      name: shippingData.name,
      whatsapp: shippingData.whatsapp,
      shippingOption: shippingData.shippingOption,
      street: shippingData.street,
      neighborhood: shippingData.neighborhood,
      number: shippingData.number,
      zipcode: shippingData.zipcode,
      reference: shippingData.reference,
      totalPrice: this.getTotalPrice(cartItems),
    };
    this.orderDataSubject.next(order);
  }

  getOrderData(): Order | null {
    return this.orderDataSubject.value;
  }

  clearOrderData(): void {
    this.orderDataSubject.next(null);
  }

  private getTotalPrice(cartItems: CartItem[]): number {
    return cartItems.reduce((acc, item) => acc + item.getTotalPrice(), 0);
  }
}
