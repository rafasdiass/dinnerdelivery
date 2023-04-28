import { Item } from './item-list/item.model';

export interface Order {
  name: string;
  whatsapp: string;
  shippingOption: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  cartItems: CartItem[];
  zipcode: string; // Adicione esta linha
  reference: string; // Adicione esta linha
  totalPrice: number; // Adicione esta linha
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
