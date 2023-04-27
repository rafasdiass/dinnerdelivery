import { Item } from './item-list/item.model';

export interface Order {
  name: string;
  whatsapp: string;
  shippingOption: string;
  street: string;
  neighborhood: string;
  number: string;
  zipcode: string;
  reference: string;
  cartItems: CartItem[];
  totalPrice: number;
}

export class CartItem {
  item: Item;
  quantity: number;

  constructor(item: Item, quantity: number) {
    this.item = item;
    this.quantity = quantity;
  }

  getTotalPrice(): number {
    return this.item.price * this.quantity;
  }
}
