import { Injectable } from '@angular/core';
import { Item } from './item-list/item.model';
import { CartItem } from './item-list/cart-item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  private deliveryOption: string = 'pickup';
  cartChanged = new Subject<number>();
  private shoppingCartId: number = 1; // Adicione esta linha

  constructor() {}

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

  increaseItemQuantity(item: Item): void {
    for (let cartItem of this.cartItems) {
      if (cartItem.item.id === item.id) {
        cartItem.quantity++;
        break;
      }
    }
    this.cartChanged.next(this.getTotalItems());
  }

  decreaseItemQuantity(item: Item): void {
    for (let cartItem of this.cartItems) {
      if (cartItem.item.id === item.id) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
          this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        }
        break;
      }
    }
    this.cartChanged.next(this.getTotalItems());
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
    let totalItems = 0;
    for (let cartItem of this.cartItems) {
      totalItems += cartItem.quantity;
    }
    return totalItems;
  }

  // Adicione este método
  getShoppingCartId(): number {
    return this.shoppingCartId;
  }
}
