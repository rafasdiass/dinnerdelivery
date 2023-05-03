import { Item } from './item-list/item.model';

export class Order {
  name: string = '';
  email: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  cardNumber: string = '';
  cardExpiration: string = '';
  cardSecurityCode: string = '';
  cartItems: CartItem[] = [];

  constructor() {}

  addItem(item: Item, quantity: number): void {
    let cartItem = new CartItem(item, quantity);
    this.cartItems.push(cartItem);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.item.unit_price * cartItem.quantity;
    }
    return totalPrice;
  }
}

export class CartItem {
  item: Item;
  quantity: number;

  constructor(item: Item, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }

  getTotalPrice(): number {
    return this.item.unit_price * this.quantity;
  }
}