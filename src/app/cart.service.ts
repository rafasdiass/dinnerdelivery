import { Injectable } from '@angular/core';
// cart.service.ts
import { Item } from './item-list/item-list.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: Item[] = [];

  constructor() { }

  addItem(item: Item): void {
    let found = false;
    for (let cartItem of this.cartItems) {
      if (cartItem.id === item.id) {
        found = true;
        cartItem.quantity++;
        break;
      }
    }
    if (!found) {
      item.quantity = 1;
      this.cartItems.push(item);
    }
  }

  getCartItems(): Item[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }

  increaseItemQuantity(item: Item): void {
    for (let cartItem of this.cartItems) {
      if (cartItem.id === item.id) {
        cartItem.quantity++;
        break;
      }
    }
  }

  decreaseItemQuantity(item: Item): void {
    for (let cartItem of this.cartItems) {
      if (cartItem.id === item.id) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
          this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        }
        break;
      }
    }
  }

}
