// cart-item.model.ts
import { Item } from './item.model';

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
